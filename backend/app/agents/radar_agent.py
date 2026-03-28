# LangGraph agent pipeline for Radar AI

import logging
from typing import TypedDict, List, Dict, Any
from langgraph.graph import StateGraph, END

from app.services.data_service import get_multiple_stocks
from app.services.signal_service import detect_signals
from app.services.backtest_service import run_backtest
from app.constants import NIFTY_STOCKS, MIN_SIGNALS_REQUIRED, TOP_OPPORTUNITIES

# Configure logging
logger = logging.getLogger(__name__)


# Define agent state
class AgentState(TypedDict):
    """State dictionary for the Radar agent pipeline."""
    tickers: List[str]
    stock_data: Dict
    raw_signals: List[Dict]
    filtered_signals: List[Dict]
    opportunities: List[Dict]
    do_nothing: bool
    message: str


def scanner_node(state: AgentState) -> AgentState:
    """
    Scanner node: Fetch stock data and detect signals for all tickers.
    
    Args:
        state: Current agent state
    
    Returns:
        Updated state with raw_signals populated
    """
    try:
        logger.info(f"Scanner node: Processing {len(state['tickers'])} tickers")
        
        # Fetch stock data
        stock_data = get_multiple_stocks(state['tickers'])
        state['stock_data'] = stock_data
        
        raw_signals = []
        
        # Detect signals for each stock
        for ticker, df in stock_data.items():
            signal_result = detect_signals(df, ticker)
            
            signal_dict = {
                "ticker": ticker,
                "signals": signal_result["signals"],
                "signal_count": signal_result["signal_count"],
                "signal_story": signal_result["signal_story"],
                "dataframe": df
            }
            raw_signals.append(signal_dict)
        
        state['raw_signals'] = raw_signals
        logger.info(f"Scanner node: Scanned {len(stock_data)} stocks, found {len(raw_signals)} with signals")
        
        return state
    
    except Exception as e:
        logger.error(f"Error in scanner node: {str(e)}")
        state['raw_signals'] = []
        return state


def filter_node(state: AgentState) -> AgentState:
    """
    Filter node: Filter signals by minimum signal count requirement.
    
    Args:
        state: Current agent state
    
    Returns:
        Updated state with filtered_signals populated
    """
    try:
        logger.info(f"Filter node: Filtering {len(state['raw_signals'])} signals")
        
        filtered_signals = []
        
        for signal_dict in state['raw_signals']:
            if signal_dict['signal_count'] >= MIN_SIGNALS_REQUIRED:
                filtered_signals.append(signal_dict)
        
        state['filtered_signals'] = filtered_signals
        logger.info(f"Filter node: {len(filtered_signals)} passed minimum signal requirement")
        
        return state
    
    except Exception as e:
        logger.error(f"Error in filter node: {str(e)}")
        state['filtered_signals'] = []
        return state


def backtest_node(state: AgentState) -> AgentState:
    """
    Backtest node: Run backtest for filtered signals and assign risk levels.
    
    Args:
        state: Current agent state
    
    Returns:
        Updated state with opportunities populated
    """
    try:
        logger.info(f"Backtest node: Running backtest for {len(state['filtered_signals'])} signals")
        
        opportunities = []
        
        for signal_dict in state['filtered_signals']:
            ticker = signal_dict['ticker']
            df = signal_dict['dataframe']
            
            # Run backtest
            backtest_result = run_backtest(df)
            
            # Determine risk level
            signal_count = signal_dict['signal_count']
            if signal_count >= 3:
                risk_level = "Aggressive"
            elif signal_count == 2:
                risk_level = "Moderate"
            else:
                risk_level = "Conservative"
            
            # Build opportunity
            opportunity = {
                "ticker": ticker,
                "signals": signal_dict['signals'],
                "signal_count": signal_count,
                "signal_story": signal_dict['signal_story'],
                "backtest": backtest_result,
                "risk_level": risk_level
            }
            
            opportunities.append(opportunity)
        
        state['opportunities'] = opportunities
        logger.info(f"Backtest node: Completed backtest for {len(opportunities)} opportunities")
        
        return state
    
    except Exception as e:
        logger.error(f"Error in backtest node: {str(e)}")
        state['opportunities'] = []
        return state


def ranker_node(state: AgentState) -> AgentState:
    """
    Ranker node: Sort and rank top opportunities.
    
    Args:
        state: Current agent state
    
    Returns:
        Updated state with ranked opportunities and final message
    """
    try:
        logger.info(f"Ranker node: Ranking {len(state['opportunities'])} opportunities")
        
        # Sort by signal_count descending
        sorted_opportunities = sorted(
            state['opportunities'],
            key=lambda x: x['signal_count'],
            reverse=True
        )
        
        # Keep top opportunities
        top_opportunities = sorted_opportunities[:TOP_OPPORTUNITIES]
        
        state['opportunities'] = top_opportunities
        
        # Set do_nothing and message
        if not top_opportunities:
            state['do_nothing'] = True
            state['message'] = "No stocks meet the minimum signal requirements"
            logger.info("Ranker node: No qualified opportunities found")
        else:
            state['do_nothing'] = False
            state['message'] = f"Found {len(top_opportunities)} trading opportunities"
            logger.info(f"Ranker node: {len(top_opportunities)} top opportunities identified")
        
        return state
    
    except Exception as e:
        logger.error(f"Error in ranker node: {str(e)}")
        state['do_nothing'] = True
        state['message'] = f"Error ranking opportunities: {str(e)}"
        return state


# Build the graph
def build_agent_graph():
    """Build and compile the LangGraph agent pipeline."""
    graph = StateGraph(AgentState)
    
    # Add nodes
    graph.add_node("scanner", scanner_node)
    graph.add_node("filter", filter_node)
    graph.add_node("backtest", backtest_node)
    graph.add_node("ranker", ranker_node)
    
    # Add edges
    graph.add_edge("scanner", "filter")
    graph.add_edge("filter", "backtest")
    graph.add_edge("backtest", "ranker")
    graph.add_edge("ranker", END)
    
    # Set entry point
    graph.set_entry_point("scanner")
    
    # Compile
    return graph.compile()


# Compile the graph
agent_graph = build_agent_graph()


def run_agent_pipeline(tickers: List[str] = None) -> dict:
    """
    Run the complete Radar agent pipeline.
    
    Args:
        tickers: List of stock tickers to analyze (default NIFTY_STOCKS)
    
    Returns:
        Dictionary with opportunities, do_nothing, and message
    """
    try:
        # Use default tickers if not provided
        if tickers is None:
            tickers = NIFTY_STOCKS
        
        logger.info(f"Starting Radar agent pipeline for {len(tickers)} stocks")
        
        # Create initial state
        initial_state = {
            "tickers": tickers,
            "stock_data": {},
            "raw_signals": [],
            "filtered_signals": [],
            "opportunities": [],
            "do_nothing": False,
            "message": ""
        }
        
        # Run the graph
        final_state = agent_graph.invoke(initial_state)
        
        logger.info(f"Agent pipeline complete: {len(final_state['opportunities'])} opportunities")
        
        # Return relevant fields
        return {
            "opportunities": final_state['opportunities'],
            "do_nothing": final_state['do_nothing'],
            "message": final_state['message']
        }
    
    except Exception as e:
        logger.error(f"Error running agent pipeline: {str(e)}")
        return {
            "opportunities": [],
            "do_nothing": True,
            "message": f"Pipeline error: {str(e)}"
        }

import { useState } from "react";
import axios from 'axios';
import { Url } from "../url";

export function useService<T>() {

  const [response, setResponse] = useState<T>();
  const [loading,setLoading]=useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const [symbols, setSymbols] = useState<Array<string>>([]);
  const [graphHistory, setGraphHistory] = useState();
  const [exchangeRates, setExchangeRates] = useState<{}>();

  const fetchData = async (query?: string): Promise<void> => {
    setLoading(true);
        try {
          const res = await axios(`${Url.base}/assets?${query}`);
          setResponse(res.data.data as T);
          let symbols = res.data.data.map((obj: any) => obj['symbol']);
          let mostUsedSymbols = symbols.slice(0, 10);
          setSymbols(mostUsedSymbols);
          setLoading(false);
        } catch (error) {
          setError(error);
          setLoading(false);
        }
  };

  const getById = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios(`${Url.base}/assets/${id}`);
      setResponse(res.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
      
  }

  const getAssetHistory = async (id: string, query: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios(`${Url.base}/assets/${id}/history?${query}`);
      let graphData = res.data.data.map((obj: any) => { return Object.values({date:obj.date,price:Number(obj.priceUsd)})});
      graphData.unshift(['x','Asset'])
      setGraphHistory(graphData);
      setLoading(false);      
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }

  const getExchangeRates = async (query: string): Promise<void> => {
    setLoading(true);
    try {
      const res = await axios(`${Url.exchangeRatesbase}?${query}`);
      setExchangeRates(res.data.rates);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  }
  
  return { response, error, graphHistory, loading, symbols, exchangeRates, fetchData, getById, getAssetHistory, getExchangeRates };

  }

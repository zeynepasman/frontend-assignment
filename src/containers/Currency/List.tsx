import { Row, Col, Table, Modal, TablePaginationConfig } from 'antd';
import Loader from "../../components/Loader/Loader";
import { useCallback, useEffect, useMemo, useState } from "react";
import { TagList } from '../../components/Tag/Tag';
import { InputSearch } from "../../components/Search/search";
import { tableColumnTextFilterConfig } from "../../components/Table/TableUtils";
import { Filter } from '../../components/Filter/Filter';
import { Asset } from "../../lib/models/currency.model";
import { useService } from "../../lib/services/fetchApi";
import { useHistory, useLocation } from 'react-router-dom';
import { Url } from '../../lib/url';
import { debounce } from 'lodash';

const rowStyle = { marginTop: '3%',marginBottom:'3%' };


const columns: Array<object> = [
  {
    title: '#',
    dataIndex: 'rank',
    render: (text: string) => text,    
  },
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => text,
    ...tableColumnTextFilterConfig<Asset>('name'),
  },
  {
    title: 'Symbol',
    dataIndex: 'symbol',
    render: (text: string) => <span>{text}</span>,
    ...tableColumnTextFilterConfig<Asset>('symbol'),
  },
  {
    title: 'Price',
    dataIndex: 'price',
    render: (text: string) => <span>{text}</span>,
  },
];

export default function CurrencyList() {

  const { response, loading, symbols, exchangeRates, fetchData, getExchangeRates } = useService<Array<Asset>>();
  const [visible, setVisible] = useState(false);
  const [selectedTags, setSelectedTags] = useState<Array<string>>([]);
  const [checked, setChecked] = useState<boolean>(false);
  const [pagination, setPagination] = useState<TablePaginationConfig>({});
  const [searchResult, setResult] = useState('');
  const [totalCount, setTotalCount] = useState(100);
  const [filterTargetCurrency, setFilterTargetCurrency] = useState('USD');
  const [data, setData] = useState<Array<Asset>>([]);

  const history = useHistory();
  const location = useLocation()

  const assetQuery: AssetRequestQueryParams = {
    limit:10,
  };

  const exchangeQuery: ExcxhangeRatesRequestQueryParams = {
    accessKey:Url.api_key,
    target: filterTargetCurrency,
  }

  const setLocationParams = (): LocationSearchParams => {
    const params = new URLSearchParams(location.search);
    const current = params.get('page');
    const limit = params.get('limit');
    return {
      current: Number(current),
      limit: Number(limit),
    }
  }
  
  useEffect(() => {
    let params = setLocationParams();
    let offset = (Number(params?.current) - 1) * Number(params?.limit);
    Promise.all([
      getExchangeRates(`access_key=${exchangeQuery.accessKey}&target=${exchangeQuery.target}`),
      location && location.search ?
        searchResult ?
          fetchData(`search=${searchResult}&limit=${pagination.pageSize}&offset=${offset}`)
          : fetchData(`limit=${pagination.pageSize}&offset=${offset}`)
        : fetchData(`limit=${assetQuery.limit}`)
    ]);
  }, []);

  useEffect(() => {
    if (response && exchangeRates) {
      let dataWithExchangeRates:Array<Asset>=[];
      response.forEach(el => {
        let newObject = Object.assign(el, { price: exchangeRates[`${el.symbol}`] });
        dataWithExchangeRates.push(newObject);
      });
      setData(dataWithExchangeRates);
    } 
  }, [response,exchangeRates]);

  useMemo(() => {  
    let params = setLocationParams();
    setPagination({
      current: Number(params.current),
      pageSize: Number(params.limit),
      total: searchResult ? response?.length : totalCount
    });
  }, [location,response]);
  
  const onRowClick = (item:Asset) => {
    history.push(`${item.id}`);
  };
  
  const setFilter = () => {
    setVisible(!visible);
  }

  const handleOk = () => {
    setVisible(false);
    getExchangeRates(`access_key=${exchangeQuery.accessKey}&target=${selectedTags[0]}`);
  };

  const handleCancel = () => {
    setVisible(false);
    setSelectedTags([]);
  };

  const handleChange = (checked: boolean, tag: string) => {
    setChecked(checked);
    const nextSelectedTags: Array<string> = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
    setSelectedTags(nextSelectedTags);
  }

  const onPaginationChange = (pagination:TablePaginationConfig) => {
    history.push(`?page=${pagination.current}&limit=${pagination.pageSize}`); 
    let offset = (Number(pagination.current) - 1) * Number(pagination.pageSize);
    if (searchResult) {
      fetchData(`search=${searchResult}&limit=${pagination.pageSize}&offset=${offset}`)
    } 
    else {
        fetchData(`limit=${pagination.pageSize}&offset=${offset}`)
    }
  }


  const handler = useCallback(debounce(fetchData, 1000), []);

  const onSearch = async (e) => {
    await handler(`search=${e.target.value}`);
    setResult(e.target.value);
  };

    return (
      <div>
        <Row style={rowStyle}>
          <Col span={8} offset={8}>
              <InputSearch onChange={onSearch}/>
          </Col>
          <Col md={8}>
            <Filter
              setFilter={setFilter}
            />
            <Modal
              title="Set Currency Filter"
              visible={visible}
              onOk={handleOk}
              onCancel={handleCancel}>
              <TagList
                listTitle={'Most ranked exchange rates:'}
                checked={checked}
                selectedTags={selectedTags}
                tagsData={symbols}
                handleChange={(checked, tag) => handleChange(checked, tag)} />
            </Modal>
          </Col>
        </Row>
        {loading !== true ?
          <Row>
            <Col md={24}>
              {data && data.length > 0 && (
                <Table
                  columns={columns}
                  dataSource={data}
                  onChange={(pagination, filters, sorter) => { onPaginationChange(pagination) }}
                  pagination={location?.search ? pagination : { defaultCurrent: 1, pageSize: 10, total: totalCount }}
                  onRow={(record) => {
                    return {
                        onClick: () => { onRowClick(record) },
                    }
                }}// click row
                />
              )}
          </Col>
        </Row> : <Loader />
        }
      </div>
    )
}
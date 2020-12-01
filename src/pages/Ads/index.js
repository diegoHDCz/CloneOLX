import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { PageArea } from './styled'
import { PageConatiner} from '../../comopnents/MainComponents'

import useApi from '../../helpers/olxapi'
import AdItem from '../../comopnents/partials/adItem'

let timer;

function Page() {
    const api = useApi()

    const useQueryString = () => {
        return new URLSearchParams(useLocation().search)
    }
    const query = useQueryString();
    
    const history = useHistory();

    const [q, setQ] = useState( query.get('q') != null ? query.get('q') : '' );
    const [cat, setCat] = useState( query.get('cat') != null ? query.get('cat') : '');
    const [ state, setState] = useState(query.get('state') != null ? query.get('state') : '');
    const [adsTotal, setAdsTotal] = useState(0);
    const [stateList, setStateList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [adList, setAdlist] = useState([]);
    const [pageCount, setPageCount] = useState(0)
    const [resultOpacity, setResultOpacity] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [loading, setLoading] = useState(true)

    const getAdsList = async() =>{
       
        setLoading(true);

        
        let offset = (currentPage - 1) * 9;

        const json = await api.getAds({
            sort:'desc',
            limit:9,
            q,
            cat,
            state,
            offset  
        });
        setAdlist(json.ads)
        setAdsTotal(json.total)
        setResultOpacity(1)
        setLoading(false)
    }

    useEffect(()=>{
        if(adList.length >0){
        setPageCount( Math.ceil(adsTotal / adList.length) )
        }else{
            setPageCount(0);
        }
    },[adsTotal])

    useEffect(()=>{
        setResultOpacity(0.3);
        getAdsList()
    },[currentPage])

    useEffect(()=>{

        let queryString = [];
        if(q) {
            queryString.push(`q=${q}`);
        }
        if(cat) {
            queryString.push(`cat=${cat}`);

        }
        if(state) {
            queryString.push(`state=${state}`)
        }

        history.replace({
            search:`?${queryString.join('&')}`
        })

        if(timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(getAdsList, 2000)
        setCurrentPage(1)
        setResultOpacity(0.3);
        

    },[q,cat,state])

    useEffect(()=>{
        const getStates = async () => {
            const slist = await api.getStates();
            setStateList(slist);
        }

        getStates();
    },[]);

    useEffect(()=>{
        const getCategories = async () => {
            const cats = await api.getCategories();
            setCategories(cats);
        }

        getCategories();
    },[])

    let pagination = [];
    for(let i=1;i<=pageCount;i++){
        pagination.push(i);
    }

    


    return (
      <PageConatiner>
          <PageArea>
              <div className="leftSide">
                <form method="GET">
                    <input type='text' 
                    name='q'  
                    placeholder="o que você procura?"
                    value={q}
                    onChange={e=>setQ(e.target.value)}
                    />

                    <div className="filterName">Estado:</div>
                    <select name="state" value={state} onChange={e=>setState(e.target.value)} >
                        <option></option>
                        {stateList.map((i,k)=>
                            <option key={k} value={i.name} >{i.name}</option>
                        )}
                    </select>
                    <div className="filterName">Categoria:</div>
                    <ul>
                            {categories.map((i,k)=>
                                <li key={k} 
                                className={cat==i.slug?'categoryItem active':'categoryItem'} 
                                onClick={()=>setCat(i.slug)}
                                >
                                  
                                    <img src={i.img} alt="" />
                                    <span>{i.name}</span>
                                </li>
                            )}
                    </ul>
                </form>
              </div>
              <div className="rightSide">
                  <h2>Resultados</h2>
                
                {loading && adList.length === 0 &&
                  <div className="listWarning">Carregando ...</div>
                }
                {!loading && adList.length === 0 &&
                <div className="listWarning">Não encontramos resultados</div>
            
                }
                  
                  <div className="list" style={{opacity:resultOpacity}}>
                      {adList.map((i,k)=>
                        <AdItem key={k} data={i} />
                      )}
                  </div>

                   <div className="pagination">
                       {pagination.map((i,k)=>

                       <div 
                       onClick={()=>setCurrentPage(i)}
                       className={i===currentPage? 'pagItem active':'pagItem'}>                           
                       {i}
                           
                      </div> )}
                       </div>     

              </div>
          </PageArea>
      </PageConatiner>
    )
}
export default Page
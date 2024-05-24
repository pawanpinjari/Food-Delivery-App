import React, { useEffect, useState } from 'react';
import MainNavbar from './MainNavbar';
import axios from 'axios';
import MenuCard from './MenuCard';
import { useSelector } from 'react-redux';
import Loading from '../Components/Loading';

const MenuData = () => {
    const restId = useSelector(state => state.restId);
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/allItem`, { restId });
                if (res.data) {
                    setData(res.data);
                } else {
                    alert("data not found");
                }
            } catch (e) {
                alert("error", e);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [restId]);

    return (
        <div>
            {loading && <div className='admin-loading'><Loading /></div>}
            <MainNavbar cart={true} />
            {data && <MenuCard restId={restId} menuData={data} />}
        </div>
    );
};

export default MenuData;

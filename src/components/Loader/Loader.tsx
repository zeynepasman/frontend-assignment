import { FC } from 'react';
import { Spin } from "antd";
import "./Loader.css";

const Loader: FC = () => {
    return (
        <div className="container">
        <Spin />
      </div>
    )
    
}
export default Loader;
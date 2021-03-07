import  { FC } from 'react';
import LoaderComponent from './Loader';

const Loader: FC = () => {
    return (<LoaderComponent>
        <svg className="contentLoader" viewBox="0 0 50 50">
            <circle
                className="contentLoaderCircle"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="3.6"
            />   
        </svg>
    </LoaderComponent>)
    
}
export default { Loader };
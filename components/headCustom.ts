import { useEffect } from 'react';

export const HeadCustom_config = (req_config) => {
    useEffect(() => {
        if(req_config.title){
            if(document.title){
                document.title = req_config.title;
            };
        };
    }, []);
};
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import en_config from '../locales/en';
import ja_config from '../locales/ja';
import links_en from '../locales/links_en';
import links_ja from '../locales/links_ja';
import ja_commadns_config from '../locales/ja_commands';
import en_commadns_config from '../locales/en_commands';
import Badge from '@/components/badge-ui/ui/badge-ui';

interface CommandsAboutProps {
    comp_lang: string;
    mode: string;
}

const CommandsAbout: React.FC<CommandsAboutProps> = ({ comp_lang, mode }) => {

    const [language, setLanguage] = useState(comp_lang);

    // 言語によって描画するコンポーネントを切り替える
    var locales = language === 'en' ? en_config : ja_config;
    var commands_config = language === 'en' ? en_commadns_config : ja_commadns_config;
    var links = language === 'en' ? links_en : links_ja;
    var lang = language === 'en' ? 'en' : 'ja';
    var flag = language === 'en' ? 'fi fi-us' : 'fi fi-jp';


    const [commandsAboutBoxes, setCommandsAboutBoxes] = useState([]);
    useEffect(() => {
        if(mode===''){
            mode='all'
        };
        if(mode){
            const commandsCount = commands_config.length;
            const boxes = [];
            var iN = 0;
            for(var i = 0; i < commandsCount; i++){
                var modeList = `[`;
                for(var iMode = 0; iMode < (commands_config[i].mode.length); iMode++){
                    if(iMode===0){
                        modeList=`${modeList}${commands_config[i].mode[iMode].name}`
                    }else{
                        modeList=`${modeList},${commands_config[i].mode[iMode].name}`
                    };
                };
                modeList = `${modeList}]`;
                if(modeList.includes(mode)){
                    if(mode===`feature`){
                        if(iN===0){
                            iN+=1;
                            boxes.push(
                                <div key={i} data-aos="fade-up" data-aos-offset={300} className="fadeUpTrigger aos-init aos-animate">
                                    <div className="hidden lg:grid grid-cols-7 gap-16">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.botPersonalizer.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {commands_config[i].title_feature}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_feature}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                            {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid lg:hidden grid-cols-1 gap-6">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.botPersonalizer.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {commands_config[i].title_feature}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_feature}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }else{
                            iN-=1;
                            boxes.push(
                                <div key={i} data-aos="fade-up" data-aos-offset={300} className="fadeUpTrigger aos-init aos-animate">
                                    <div className="hidden lg:grid grid-cols-7 gap-16">
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {commands_config[i].title_feature}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_feature}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:mr-0 lg:ml-auto"
                                            arial-label="home.sections.welcome.title.alt"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid lg:hidden grid-cols-1 gap-6">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.welcome.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {commands_config[i].title_feature}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_feature}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        };
                    };
                    if(mode==='all'){
                        if(iN===0){
                            iN+=1;
                            boxes.push(
                                <div key={i} data-aos="fade-up" data-aos-offset={300} className="fadeUpTrigger aos-init aos-animate">
                                    <div className="hidden lg:grid grid-cols-7 gap-16">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.botPersonalizer.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {locales.コマンド} - {commands_config[i].commandName}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_short}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid lg:hidden grid-cols-1 gap-6">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.botPersonalizer.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {locales.コマンド} - {commands_config[i].commandName}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_short}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }else{
                            iN-=1;
                            boxes.push(
                                <div key={i} data-aos="fade-up" data-aos-offset={300} className="fadeUpTrigger aos-init aos-animate">
                                    <div className="hidden lg:grid grid-cols-7 gap-16">
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {locales.コマンド} - {commands_config[i].commandName}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_short}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:mr-0 lg:ml-auto"
                                            arial-label="home.sections.welcome.title.alt"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid lg:hidden grid-cols-1 gap-6">
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[560px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.welcome.title.alt"
                                            />
                                        </div>
                                        <div className="col-span-3 flex flex-col justify-center items-start text-center lg:text-left">
                                            <h2 className="text-dark-100 mx-auto lg:mx-0 font-bold text-[35px] leading-[42px]">
                                            {locales.コマンド} - {commands_config[i].commandName}
                                            </h2>
                                            <p className="text-dark-300 text-base my-8 whitespace-pre-line">
                                            {commands_config[i].description_short}
                                            </p>
                                            <div className="w-full flex-col lg:flex-row flex items-center justify-start gap-4">
                                                <a
                                                    href={commands_config[i].command_more_url}
                                                    className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white bg-opacity-10 text-white hover:bg-opacity-20 active:bg-opacity-5 active:text-opacity-60 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-opacity-10 w-full lg:w-auto text-base px-6 py-3"
                                                >
                                                    <div className="flex flex grow justify-center max-w-full">
                                                        <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        {locales.もっと詳しく知る}
                                                        </span>
                                                    </div>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        };
                    };
                    if(mode==='more'){
                        var bageData;
                        if(commands_config[i].badgeName){
                            bageData = <Badge mode={commands_config[i].badgeColor}>{commands_config[i].badgeName}</Badge>;
                        }else{
                            bageData = <div></div>;
                        }
                        boxes.push(
                            <li key={i} className='box'>
                                <div className="flex flex-col lg:flex-row pt-12 pb-12 border-b-[1px] border-slate-500 border-solid">
                                    <a href={`/${lang}/commands`} className='sm:mr-0 lg:mr-7'>
                                        <div className='min-w-60 min-h-44 inline-block bg-cover bg-center rounded-none' style={{backgroundImage:`url(${commands_config[i].commandImg_url})`}} />
                                    </a>
                                    <div dir="ltr" className="flex flex-col">
                                        <span className="font-medium font-[Helvetica Neue] mb-[10px] block pt-[0] text-blue-default text-[14px] uppercase">
                                            <a href={`/${lang}/commands`}>/{commands_config[i].commandName}</a>
                                        </span>
                                        <a href={`/${lang}/commands`}>
                                            <h2 className="text-white text-2xl font-bold sc-hwdzOV kmaPT">
                                            {locales.コマンド_n_を使用する方法_1}{commands_config[i].name}{locales.コマンド_n_を使用する方法_2}
                                            </h2>
                                        </a>
                                        <p>
                                            <a href={`/${lang}/commands`}>
                                            {commands_config[i].description}
                                            </a>
                                        </p>
                                        <div className='flex flex-wrap gap-1 mt-2 select-none pointer-events-none'>
                                        {bageData}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    };
                    if(mode==='guides'){
                        var bageData;
                        if(commands_config[i].badgeName){
                            bageData = <Badge mode={`${commands_config[i].badgeColor}`}>{`${commands_config[i].badgeName}`}</Badge>;
                        }else{
                            bageData = <div></div>;
                        }
                        boxes.push(
                            <li key={i} className='box'>
                                <div className="flex flex-col pt-12 pb-12 border-b-[1px] border-slate-500 border-solid">
                                    <a href={`/${lang}/commands`} className='sm:mr-0 lg:mr-7'>
                                        <div className="col-span-4">
                                            <img
                                            src={commands_config[i].commandImg_url}
                                            className="w-full max-w-[360px] ml-auto mr-auto  lg:ml-0 lg:mr-auto"
                                            arial-label="home.sections.botPersonalizer.title.alt"
                                            />
                                        </div>
                                    </a>
                                    <div dir="ltr" className="flex flex-col">
                                        <span className="font-medium font-[Helvetica Neue] mb-[10px] block pt-[0] text-blue-default text-[14px] uppercase">
                                            <a href={`/${lang}/commands`}>/{commands_config[i].commandName}</a>
                                        </span>
                                        <a href={`/${lang}/commands`}>
                                            <h2 className="text-white text-2xl font-bold sc-hwdzOV kmaPT">
                                            {locales.コマンド_n_を使用する方法_1}{commands_config[i].name}{locales.コマンド_n_を使用する方法_2}
                                            </h2>
                                        </a>
                                        <p>
                                            <a href={`/${lang}/commands`}>
                                            {commands_config[i].description}
                                            </a>
                                        </p>
                                        <div className='flex flex-wrap gap-1 mt-2 select-none pointer-events-none'>
                                        {bageData}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        );
                    };
                };
            };
            setCommandsAboutBoxes(boxes);
        };
    },[mode]);

    return commandsAboutBoxes;
};

CommandsAbout.propTypes = {
    mode: PropTypes.oneOf(['','test','feature','all','more','guides']).isRequired,
};

export default CommandsAbout;
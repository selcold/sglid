'use client'

import React, { useState, useEffect } from 'react';
//Font Awesome / https://fontawesome.com/search?o=r&m=free
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
//link list
import MainLinks_config from '../../public/assets/links/main_link_config';
// scroll show
import { FadeUpTrigger } from '../../components/fadeUpTrigger';
// head custom
import { HeadCustom_config } from '../../components/headCustom';
//component
import Header from '../../components/header';
import Footer from '../../components/footer';
import CommandsAbout from '../../components/commandsAbout';
import GetLocationLanguage from '../../components/langCheck';
import links_en from '../../locales/links_en';
import links_ja from '../../locales/links_ja';
import en_config from '../../locales/en';
import ja_config from '../../locales/ja';
import { ViewLocked_check } from '../../components/siteView/site_view';

export default function Home() {
    // ページロード
    const [isLangLoaded, setPageLoaded] = useState(false);
    useEffect(() => {
      const fetchLanguage = async () => {
          try {
            const storedLanguage_sub = localStorage.getItem('language');
            if(storedLanguage_sub){
                if( storedLanguage_sub === 'ja' || storedLanguage_sub === 'en' ){
                }else{
                    localStorage.setItem('language', 'en');
                }
            };
            const storedLanguage = localStorage.getItem('language');
            const initialLanguage = storedLanguage || 'en';

            const path = window.location.pathname;
            const first3Chars = path.slice(0, 3);
            const modifiedPath = first3Chars.replace(/\//g, '');
            const match = modifiedPath.match(/^([a-z]{2})$/);
            const languageCode = match ? match[1] : "en";
            const winPath = window.location.pathname;
            const newPath = winPath.slice(3);
            if (initialLanguage !== languageCode || newPath.length === 0) {
                window.location.href = `/${initialLanguage}/${newPath}`;
            }
            setPageLoaded(true);
          } catch (error) {
              console.error("Error fetching language:", error);
          }
      };

      // 言語情報をまだ取得していない場合にのみ非同期で取得する
      if (!isLangLoaded) {
          fetchLanguage();
      }
    }, [isLangLoaded]);
    const location_language = GetLocationLanguage();
    const locales = location_language === 'en' ? en_config : ja_config;
    const links = location_language === 'en' ? links_en : links_ja;

  // 表示認証制度機能
  var isSiteViewLoad;
  if(process.env.NEXT_PUBLIC_SITE_VIEW_Locked === 'true'){
    isSiteViewLoad = ViewLocked_check('')
  }else{
    isSiteViewLoad = true
  }
  const [ViewLocked_password, setViewLocked_password] = useState('');

  // headカスタム
  const Head_config = {
    "title":`${locales.ホーム} | Sglid`,
  };
  HeadCustom_config(Head_config);

  // 読み込みアニメーション
  FadeUpTrigger();

  return (
    <body style={{backgroundColor:`rgb(39 41 52)`,color:`rgb(145 149 171)`}}>
        <div className="fixed flex justify-center items-center w-full h-full" aria-label="loading">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
    </body>
  )
}

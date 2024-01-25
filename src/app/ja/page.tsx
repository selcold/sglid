'use client'

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MainLinks_config from '../../../public/assets/links/main_link_config';
import { FadeUpTrigger } from '@/lib/fadeUpTrigger';
import { HeadCustom_config } from '@/lib/headCustom';
import Header from '../../../components/header';
import Footer from '../../../components/footer';
import CommandsAbout from '../../../components/commandsAbout';
import GetLocationLanguage from '@/lib/langCheck';
import links_en from '../../../locales/links_en';
import links_ja from '../../../locales/links_ja';
import en_config from '../../../locales/en';
import ja_config from '../../../locales/ja';

export default function Home() {
  const [isLangLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const fetchLanguage = async () => {
        try {
            const storedLanguage = localStorage.getItem('language');
            const initialLanguage = storedLanguage || navigator.language || 'en';

            const path = window.location.pathname;
            const first3Chars = path.slice(0, 3);
            const modifiedPath = first3Chars.replace(/\//g, '');
            const match = modifiedPath.match(/^([a-z]{2})$/);
            const languageCode = match ? match[1] : "en";
            if (initialLanguage !== languageCode) {
                const winPath = window.location.pathname;
                const newPath = winPath.slice(3);
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

  const Head_config = {
    "title":`${locales.ホーム} | Sglid`,
  };
  HeadCustom_config(Head_config);

  FadeUpTrigger();
  return (
    <body className='m-0 p-0' style={{'--tw-bg-opacity':`1`,backgroundColor:`rgb(39 41 52/var(--tw-bg-opacity))`,'--tw-text-opacity':`1`,color:`rgb(145 149 171/var(--tw-text-opacity))`}}>
      {isLangLoaded ? (
        <>
          {/* Header */}
          <Header comp_lang={location_language} />
          {/* トップイメージ */}
          <div id='top_image' className="w-full relative z-1 min-h-[calc(100vh-20%)] flex" style={{background:`linear-gradient(rgb(19, 21, 31) -4.84%, rgb(29, 28, 47) 34.9%, rgb(32 38 54) 48.6%, rgb(40 48 62) 66.41%, rgb(61 85 98) 103.41%, rgb(81 124 140) 132.18%)`}}>
            <div className="absolute w-full h-full -z-1 bottom-0 left-0 pointer-events-none overflow-hidden">
              <img src="/assets/img/sglid_banner.png" alt="Forest dark" className="w-full absolute bottom-0 pt-96" />
            </div>
            <div className="backdrop-blur-sm backdrop-brightness-50 min-h-full w-full flex items-center justify-start">
              <div className="mx-auto w-full max-w-screen-lg px-6 lg:px-10 py-6 lg:py-10 pt-10 lg:pt-24 lg:py-36">
                <div className="w-full text-center md:w-3/5 md:mx-auto lg:mx-0 ltr:lg:text-left lg:text-left lg:w-2/5">
                  <h1 className="text-white min-h-32 font-bold text-displaySmall lg:text-displayLarge">{locales.便利な機能があるScratch関連BOT}</h1>
                  <p className="text-inherit text-base mt-7 mb-10 whitespace-pre-line">{locales['Scratchユーザーやプロジェクトを検索したり、Scratch アカウントと Discord アカウントをリンクしたりできます。 さらに、サーバー管理タスクを実行できます。']}</p>
                  <div className="flex flex-col md:flex-row justify-center lg:justify-start items-stretch gap-4 max-w-[168px] lg:max-w-none m-auto">
                    <a href={MainLinks_config.discordBot_add_sglid} target='_block'>
                      <button className="button_blue_1" style={{backgroundColor:`#7289da`}}>
                        <div className="flex flex grow justify-center max-w-full">
                          <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <svg width="24" height="24" viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-dark-100 w-5">
                                <path d="M15.248 1.089A15.431 15.431 0 0011.534 0a9.533 9.533 0 00-.476.921 14.505 14.505 0 00-4.12 0A9.582 9.582 0 006.461 0a15.54 15.54 0 00-3.717 1.091C.395 4.405-.242 7.636.076 10.821A15.269 15.269 0 004.631 13c.369-.473.695-.974.975-1.499a9.896 9.896 0 01-1.536-.699c.13-.089.255-.18.377-.27 1.424.639 2.979.97 4.553.97 1.574 0 3.129-.331 4.553-.97.123.096.25.188.377.27a9.94 9.94 0 01-1.54.7c.28.525.607 1.026.976 1.498a15.2 15.2 0 004.558-2.178c.373-3.693-.639-6.895-2.676-9.733zM6.01 8.862c-.888 0-1.621-.767-1.621-1.712 0-.944.708-1.718 1.618-1.718.91 0 1.638.774 1.623 1.718-.016.945-.715 1.712-1.62 1.712zm5.98 0c-.889 0-1.62-.767-1.62-1.712 0-.944.708-1.718 1.62-1.718.912 0 1.634.774 1.618 1.718-.015.945-.713 1.712-1.618 1.712z" fill="currentColor"></path>
                              </svg>
                                {locales.Discordに追加}
                            </div>
                          </span>
                        </div>
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 製作者 / 開発者 */}
          <div className="bg-dark-800">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 undefined">
              <div className="flex-col lg:flex-row flex items-center gap-8">
                <div className="lg:flex items-center justify-center lg:justify-start w-full lg:w-1/3">
                  <h4 className="text-dark-100 undefined font-bold text-h4 text-center mb-2 lg:mb-0">
                  {locales.BOT製作者}
                  </h4>
                  <div className="flex items-center flex-wrap justify-center lg:justify-left gap-8 lg:flex-1">
                    <a className='tooltip' href='https://github.com/Masaabu' target='_block'>
                      <img src="/assets/img/@Masaabu-YT_icon.png" className="w-[60px] h-[60px] rounded-lg aos-init aos-animate" arial-label="@Masaabu-YT" data-aos="fade-up" data-aos-delay="200"/>
                      <span className='tooltiptext'>Masaabu</span>
                    </a>
                    <a className='tooltip' href='https://github.com/chasyumen' target='_block'>
                      <img src="https://cdn.discordapp.com/avatars/614305573827117066/ce428c1151ec244cfea955c9bad9b1c3.webp?size=60" className="w-[60px] h-[60px] rounded-lg aos-init aos-animate" arial-label="@chasyumen" data-aos="fade-up" data-aos-delay="300"/>
                      <span className='tooltiptext'>chasyumen</span>
                    </a>
                  </div>
                </div>
                <div className="lg:flex items-center justify-center lg:justify-start w-full lg:w-1/3">
                  <h4 className="text-dark-100 undefined font-bold text-h4 text-center mb-2 lg:mb-0">
                  {locales.サイト製作者}
                  </h4>
                  <div className="flex items-center flex-wrap justify-center lg:justify-left gap-8 lg:flex-1">
                    <a className='tooltip' href='https://github.com/fun117/' target='_block'>
                      <img src="/assets/img/@Fun117_icon.png" className="w-[60px] h-[60px] rounded-lg aos-init aos-animate" arial-label="@Fun117" data-aos="fade-up" data-aos-delay="400"/>
                      <span className='tooltiptext'>Fun117</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* 主要コマンド紹介 */}
          <div>
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 !py-16 lg:!py-40">
              <div className="grid grid-cols-1 gap-12 lg:gap-36">
                <CommandsAbout comp_lang={location_language} mode='feature'/>
              </div>
            </div>
          </div>
          {/* BOTを追加する様に誘導 */}
          <div className="undefined bg-brand-hover w-full">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 text-center py-16 lg:!pt-20 lg:!pb-16 relative z-1">
              <div className="w-full max-w-2xl mx-auto">
                <h2 className="text-dark-100 undefined font-bold text-[35px] leading-[42px]">
                {locales['最高の Discord Bot を無料で導入する']}
                </h2>
              </div>
              <a href={MainLinks_config.discordBot_add_sglid} target='_block'>
                <button className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-white text-dark-default hover:bg-opacity-80 active:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-opacity-100 py-3 px-10 w-full lg:w-auto mx-auto mt-8 text-base px-6 py-3">
                  <div className="flex flex grow justify-center max-w-full">
                    <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                      <div className="flex items-center gap-2 justify-center">
                        <svg width={24} height={24} viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-discord-default w-5">
                          <path d="M15.248 1.089A15.431 15.431 0 0011.534 0a9.533 9.533 0 00-.476.921 14.505 14.505 0 00-4.12 0A9.582 9.582 0 006.461 0a15.54 15.54 0 00-3.717 1.091C.395 4.405-.242 7.636.076 10.821A15.269 15.269 0 004.631 13c.369-.473.695-.974.975-1.499a9.896 9.896 0 01-1.536-.699c.13-.089.255-.18.377-.27 1.424.639 2.979.97 4.553.97 1.574 0 3.129-.331 4.553-.97.123.096.25.188.377.27a9.94 9.94 0 01-1.54.7c.28.525.607 1.026.976 1.498a15.2 15.2 0 004.558-2.178c.373-3.693-.639-6.895-2.676-9.733zM6.01 8.862c-.888 0-1.621-.767-1.621-1.712 0-.944.708-1.718 1.618-1.718.91 0 1.638.774 1.623 1.718-.016.945-.715 1.712-1.62 1.712zm5.98 0c-.889 0-1.62-.767-1.62-1.712 0-.944.708-1.718 1.62-1.718.912 0 1.634.774 1.618 1.718-.015.945-.713 1.712-1.618 1.712z" fill="currentColor"/>
                        </svg>
                        {locales.Discordに追加}
                      </div>
                    </span>
                  </div>
                </button>
              </a>
            </div>
          </div>
          <div className="undefined w-full">
            <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 text-center py-16 lg:!pt-20 lg:!pb-16 relative z-1">
              <div className="w-full max-w-2xl mx-auto">
                <h2 className="text-dark-100 undefined font-bold text-[35px] leading-[42px]">
                {locales.サポート}
                </h2>
              </div>
              <div className='fadeUpTrigger flex flex-wrap items-center justify-center mt-3 lg:mt-6 gap-5'>
                <iframe src="https://discord.com/widget?id=810030361189810229&amp;theme=dark" className='max-w-[350px]  h-[400px] lg:h-[500px]' allowtransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
                <iframe src="https://discord.com/widget?id=1002922339287187456&theme=dark" className='max-w-[350px] h-[400px] lg:h-[500px]' allowransparency="true" frameBorder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"></iframe>
              </div>
            </div>
          </div>
          {/* footer */}
          <Footer comp_lang={location_language}/>
        </>
      ) : (
        // 言語が読み込まれるまで表示するコンテンツ
        <div className="fixed flex justify-center items-center w-full h-full" aria-label="loading">
          <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
    </body>
  )
}
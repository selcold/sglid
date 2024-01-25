import React, { useState, useEffect } from 'react';
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import "flag-icons/css/flag-icons.min.css";

import { Button } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import MainLinks_config from '../public/assets/links/main_link_config';
import ja_config from '../locales/ja';
import en_config from '../locales/en';
import links_en from '../locales/links_en';
import links_ja from '../locales/links_ja';
import getLocationLanguage from '@/lib/langCheck';

interface HeaderProps {
    comp_lang: string;
}

export default function Header({ comp_lang }: HeaderProps) {
    const [language, setLanguage] = useState(comp_lang);

    // ==== 設定 ====
    const header_scroll_block_y = 400;
    // ==============

    // 言語によって描画するコンポーネントを切り替える
    var locales = language === 'en' ? en_config : ja_config;
    var links = language === 'en' ? links_en : links_ja;
    var lang = language === 'en' ? 'English' : '日本語';
    var flag = language === 'en' ? 'fi fi-us' : 'fi fi-jp';


    useEffect(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', () => {
                header_scroll_block_check();
            });
        }
    }, []);

    const header_scroll_block_check = () => {
        const header_element = document.getElementById('header');
        if (header_element) {
            const y = window.scrollY;
            if (y <= 80) {
                header_element.classList.remove(`fadeOutUp`);
                header_element.classList.add(`relative`);
                header_element.classList.remove(`fixed`);
            } else {
                if (y >= header_scroll_block_y) {
                    header_element.classList.add(`fixed`);
                    header_element.classList.remove(`fadeOutUp`);
                    header_element.classList.add(`fadeDown`);
                    header_element.classList.remove(`relative`);
                } else {
                    if (header_element.className.search(`fadeDown`)) {
                        header_element.classList.add(`fadeOutUp`);
                        header_element.classList.remove(`fadeDown`);
                    }
                }
            }
        }
    };

    const toggleLanguage = () => {
        const newLanguage = language === 'en' ? 'ja' : 'en';
        setLanguage(newLanguage);
        localStorage.setItem('language', newLanguage);

        const winPath = window.location.pathname;
        const newPath = winPath.slice(3);
        window.location.href = `/${newLanguage}/${newPath}`;
    };

    return (
        <div id='header' onLoad={header_scroll_block_check} className="relative w-full h-20 border-b border-solid flex items-center justify-center z-50 top-0 border-slate-700 bg-[#151621]" style={{'--tw-bg-opacity':`1!important`,backgroundColor:`rgb(21 22 33/var(--tw-bg-opacity))!important`}}>
            <div className="mx-5 w-full max-w-screen-lg flex items-center justify-between">
                <div className="flex items-center justify-start gap-x-10">
                    <a className="active" href={links.siteSglid_home} target="_self" aria-current="page">
                        <div className="flex items-center justify-content relative">
                            <img width={40} src="/assets/img/Sglid_icon.png"/>
                            <h1 className="text-2xl ml-1 text-white"><strong>{locales.Sglid}</strong></h1>
                        </div>
                    </a>
                    <div className="hidden md:block">
                        <ul className="flex gap-4">
                            <li>
                                <a href={links.siteSglid_home}>
                                    <button className='animation_text_hover_color'>{locales.ホーム}</button>
                                </a>
                            </li>
                            <li>
                                <a href={links.siteSglid_commands}>
                                    <button className='animation_text_hover_color'>{locales.コマンド}</button>
                                </a>
                            </li>
                            <li>
                                <a href={links.siteSglid_guides}>
                                    <button className='animation_text_hover_color'>{locales.ガイド}</button>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center justify-end gap-5">
                    <div className="hidden md:block">
                        <div className="flex gap-5 justify-end items-center">
                            <a href={links.discordBot_add_sglid} target='_block'>
                                <button className='button_border_1'>{locales.導入}</button>
                            </a>
                            <a href={links.discordBot_sglid_supportServer_url} target='_block'>
                                <button className='button_border_1'>{locales.サポート}</button>
                            </a>
                            <button className='button_blue_1' onClick={toggleLanguage}>
                                <span className={flag}></span>
                                {lang}
                            </button>
                        </div>
                    </div>
                    <div className="block md:hidden">
                        <div className="flex gap-5 justify-end items-center">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline"><FontAwesomeIcon icon={faBars} /></Button>
                                </SheetTrigger>
                                <SheetContent>
                                    <SheetHeader>
                                        <SheetTitle>{locales.Sglid}</SheetTitle>
                                        <SheetDescription>
                                            {locales['Scratchユーザーやプロジェクトを検索したり、Scratch アカウントと Discord アカウントをリンクしたりできます。 さらに、サーバー管理タスクを実行できます。']}
                                        </SheetDescription>
                                    </SheetHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid items-center gap-4">
                                            <a href={links.siteSglid_commands} className='button_border_1'>
                                            {locales.コマンド}
                                            </a>
                                            <a href={links.siteSglid_guides} className='button_border_1'>
                                            {locales.ガイド}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid items-center gap-4">
                                            <a href={links.discordBot_add_sglid} className='button_blue_1' target='_block'>
                                            {locales.導入}
                                            </a>
                                            <a href={links.discordBot_sglid_supportServer_url} className='button_blue_1' target='_block'>
                                            {locales.サポート}
                                            </a>
                                            <button className='button_blue_1' onClick={toggleLanguage}>
                                                <span className={flag}></span>
                                                {lang}
                                            </button>
                                        </div>
                                    </div>
                                    <SheetFooter>
                                        <SheetClose className='grid'>
                                            <Button>{locales.閉じる}</Button>
                                        </SheetClose>
                                    </SheetFooter>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                </div>
            </div>
        </div>
    );
}

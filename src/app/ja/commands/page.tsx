'use client'

import * as React from "react";
import { useEffect,useState } from 'react';
//Font Awesome / https://fontawesome.com/search?o=r&m=free
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  } from '@fortawesome/free-solid-svg-icons';
//link list
import MainLinks_config from '../../../../public/assets/links/main_link_config';
// head custom
import { HeadCustom_config } from '../../../../components/headCustom';
// component
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
import CommandsAbout from '../../../../components/commandsAbout';
// shadcn/ui
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import en_config from '../../../../locales/en';
import ja_config from '../../../../locales/ja';
import links_en from '../../../../locales/links_en';
import links_ja from '../../../../locales/links_ja';
import GetLocationLanguage from '../../../../components/langCheck';
import { ViewLocked_check, updatePassword } from "../../../../components/siteView/site_view";

const commands = [
    {
        value: "all",
        label: "all",
    },
    {
        value: "about",
        label: "about",
    },
    {
        value: "counter",
        label: "counter",
    },
    {
        value: "globalchat",
        label: "globalchat",
    },
    {
        value: "help",
        label: "help",
    },
    {
        value: "janken",
        label: "janken",
    },
    {
        value: "omikuji",
        label: "omikuji",
    },
    {
        value: "ping",
        label: "ping",
    },
    {
        value: "play",
        label: "play",
    },
    {
        value: "pro",
        label: "pro",
    },
    {
        value: "qplay",
        label: "qplay",
    },
    {
        value: "queue",
        label: "queue",
    },
    {
        value: "sc",
        label: "sc",
    },
    {
        value: "server",
        label: "server",
    },
    {
        value: "setlog",
        label: "setlog",
    },
    {
        value: "setting",
        label: "setting",
    },
    {
        value: "skip",
        label: "skip",
    },
    {
        value: "slowmode",
        label: "slowmode",
    },
    {
        value: "stop",
        label: "stop",
    },
]

export default function Home() {
    // 表示認証制度機能
    var isSiteViewLoad;
    if(process.env.NEXT_PUBLIC_SITE_VIEW_Locked === 'true'){
        isSiteViewLoad = ViewLocked_check()
    }else{
        isSiteViewLoad = true
    }
    const [ViewLocked_password, setViewLocked_password] = useState('');

    // ページロード
    const [isLangLoaded, setLangLoaded] = useState(false);
    useEffect(() => {
        const fetchLanguage = async () => {
            try {
                setLangLoaded(true);
            } catch (error) {
                console.error("Error fetching language:", error);
            }
        };

        if (!isLangLoaded) {
            fetchLanguage();
        }else{
            if(typeof window !== 'undefined'){
                const select_command = document.getElementById('select_commands');
                if(select_command){
                    var mo = new MutationObserver(function() {
                        let cards = document.querySelectorAll('.box');
                        if (cards) {
                            let search_query = select_command.textContent || "";  // Nullish Coalescing 演算子を使用して、textContent が null または undefined の場合は空文字列にする
                            for (var i = 0; i < cards.length; i++) {
                                cards[i].classList.add("hidden");
                            }
                            setTimeout(() => {
                                if (search_query !== null) {
                                    if (search_query === "all" || search_query === "コマンドを選択...") {
                                        for (var i = 0; i < cards.length; i++) {
                                            cards[i].classList.remove("hidden");
                                        }
                                    } else {
                                        for (var i = 0; i < cards.length; i++) {
                                            const cardText = cards[i].textContent || "";  // Nullish Coalescing 演算子を使用して、textContent が null または undefined の場合は空文字列にする
                                            if (cardText.toLowerCase().includes(search_query.toLowerCase())) {
                                                cards[i].classList.remove("hidden");
                                            } else {
                                                cards[i].classList.add("hidden");
                                            }
                                        }
                                    }
                                }
                            }, 0);
                        }
                    });
                    var config = {
                        characterData: true,
                        subtree: true,
                    };
                    mo.observe(select_command, config);
                };
            };
        }
    }, [isLangLoaded]);
    var location_language = GetLocationLanguage();
    const locales = location_language === 'en' ? en_config : ja_config;
    const links = location_language === 'en' ? links_en : links_ja;

    // Headを編集
    const Head_config = {
        "title":`${locales.コマンド} | Sglid`,
    };
    HeadCustom_config(Head_config);

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    return (
        <body style={{backgroundColor:`rgb(39 41 52)`,color:`rgb(145 149 171)`}}>
            {isLangLoaded ? (
                <>
                    {isSiteViewLoad ? (
                        <>
                            {/* Header */}
                            <Header comp_lang={location_language}/>
                            {/* 主要コマンド紹介 */}
                            <div>
                                <section className="text-center mb-[130px] mt-[110px] width-full">
                                    <h1 className="text-white text-[50px] font-bold">{locales.Sglid} Discord {locales.コマンド}</h1>
                                    <p className="text-[24px] mt-[10px]">{locales["詳細なガイドとチュートリアルでコマンドを使用する方法を学びましょう！"]}</p>
                                </section>
                                <div className="w-[100%] bg-grey-700 overflow-scroll overflow-x-auto">
                                    <div className="flex flex-col h-[70px] px-10 py-6 max-w-[960px] m-auto">
                                        <nav className="h-[70px] tracking-widest uppercase font-light">
                                            <a
                                                className="hover:underline mr-[50px] text-white underline"
                                                href="/commands"
                                            >
                                                {locales.ホーム}
                                            </a>
                                        </nav>
                                    </div>
                                </div>
                                <section className="pt-[50px] pb-[50px] min-h-[520px]">
                                    <div className="relative flex flex-col px-10 py-6 max-w-[960px] m-auto">
                                        <div className='flex flex-wrap mb-5 lg:mb-1 lg:min-w-[582px]'>
                                            <h1 className="text-white font-bold mb-[20px] uppercase text-[30px] tracking-widest border-b-[4px] border-blue-default w-fit pb-[5px]">
                                                {locales.全て参照}
                                            </h1>
                                            <div className="lg:absolute max-w-[200px] min-w-[200px] lg:top-[24px] lg:right-[40px] ml-5 lg:ml-0">
                                                <div className="relative bg-zinc-900 rounded-md">
                                                    <Popover open={open} onOpenChange={setOpen}>
                                                        <PopoverTrigger asChild>
                                                            <Button id='select_commands' className="bg-zinc-900  w-[200px] justify-between" variant="outline" role="combobox" aria-expanded={open}>
                                                                {value
                                                                    ? commands.find((commands) => commands.value === value)?.label
                                                                    : `${locales.コマンドを選択}...`}
                                                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-[200px] p-0">
                                                            <Command>
                                                                <CommandInput placeholder="コマンドを検索..." />
                                                                <CommandEmpty>{locales["コマンドが見つかりません。"]}</CommandEmpty>
                                                                <CommandGroup>
                                                                    {commands.map((commands) => (
                                                                    <CommandItem key={commands.value} value={commands.value} onSelect={(currentValue) => {
                                                                        setValue(currentValue === value ? "" : currentValue)
                                                                        setOpen(false)
                                                                        }}
                                                                    >
                                                                        <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            value === commands.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                        />
                                                                        {commands.label}
                                                                    </CommandItem>
                                                                    ))}
                                                                </CommandGroup>
                                                            </Command>
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                            </div>
                                        </div>
                                        {/* コマンドの詳細説明 */}
                                        <ul>
                                            <CommandsAbout comp_lang={location_language} mode='more'/>
                                        </ul>
                                    </div>
                                </section>
                            </div>
                            {/* BOTを追加する様に誘導 */}
                            <div className="undefined bg-brand-hover w-full">
                                <div className="mx-auto w-full max-w-[1240px] px-6 lg:px-10 py-6 lg:py-10 text-center py-16 lg:!pt-20 lg:!pb-16 relative z-1">
                                <div className="w-full max-w-2xl mx-auto">
                                    <h2 className="text-dark-100 undefined font-bold text-[35px] leading-[42px]">
                                    {locales["最高の Discord Bot を無料で導入する"]}
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
                            {/* footer */}
                            <Footer comp_lang={location_language}/>
                        </>
                    ) : (
                        <div className='fixed flex flex-col justify-center items-center w-full h-full'>
                            <div className='flex flex-col justify-center items-center p-4 mb-10 gap-2'>
                                <h1 className='font-bold text-4xl'>ビル経営ゲーム</h1>
                                <p className='p-5'>サイトは現在限定公開です。表示するにはパスワード認証を行う必要があります。</p>
                            </div>
                            <div className='gap-4 flex flex-col justify-center items-center'>
                                <input type='text' placeholder='パスワード' className='flex min-h-[20px] min-w-[200px] lg:w-[400px] rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setViewLocked_password(e.target.value)}/>
                                <button className='button_blue_1' onClick={() => updatePassword(ViewLocked_password)}>表示</button>
                            </div>
                        </div>
                    )}
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

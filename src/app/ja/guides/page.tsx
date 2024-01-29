'use client'

import * as React from "react";
import { useEffect,useState } from 'react';
//Font Awesome / https://fontawesome.com/search?o=r&m=free
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faL,
    faArrowLeft,
    faArrowRight,
    faHand,
    faHandFist,
    faHandPeace,
    faCircleExclamation,
    faFlagCheckered,
    faEarthAsia,
    faIdBadge,
    faFlag,
    faUser,
    faMusic,
    faHeart,
    faStar,
    faEye
} from '@fortawesome/free-solid-svg-icons';
//link list
import MainLinks_config from '../../../../public/assets/links/main_link_config';
// head custom
import { HeadCustom_config } from '../../../../components/headCustom';
// component
import Header from '../../../../components/header';
import Footer from '../../../../components/footer';
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
import { DIscordMsgEmbed, DiscordMsg } from "@/components/discord-messages-ui-beta/ui/discord_massage_ui";
import Badge from "@/components/badge-ui/ui/badge-ui";
import en_commadns_config from "../../../../locales/en_commands";
import ja_commadns_config from "../../../../locales/ja_commands";
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
        isSiteViewLoad = ViewLocked_check('')
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
    const locales_commands = location_language === 'en' ? en_commadns_config : ja_commadns_config;
    const links = location_language === 'en' ? links_en : links_ja;

    // Headを編集
    const Head_config = {
        "title":`${locales.ガイド} | Sglid`,
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
                                <div className="flex items-center justify-between mb-20 lg:mb-40 mt-11 lg:mt-40 mr-auto ml-auto pr-10 pl-10 max-w-6xl w-full flex-col-reverse lg:flex-row" style={{WebkitBoxAlign:`center`,WebkitBoxPack:`justify`}}>
                                    <div className="flex flex-col items-center lg:items-start">
                                        <h1 className="text-white font-bold text-4xl lg:text-6xl max-w-[560px] text-center lg:text-left">
                                        {locales["Discord botの使い方を習得"]}
                                        </h1>
                                        <p className="text-sm mt-8 max-w-[360px] text-center lg:text-left">
                                        {locales["Sglid の詳細なガイドとチュートリアルでBotを使用する方法を学びましょう！"]}
                                        </p>
                                        <a href={MainLinks_config.discordBot_add_sglid} target='_block'>
                                            <button className="relative flex overflow-hidden shrink-0 rounded-lg transition-all duration-200 items-center  gap-1.5 bg-brand-default text-dark-100 hover:bg-brand-hover active:bg-brand-default active:bg-opacity-40 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-brand-default mt-8 text-base px-6 py-3" style={{backgroundColor:`#7289da`}}>
                                                <div className="flex flex grow justify-center max-w-full">
                                                    <span className="transition-all duration-200 whitespace-nowrap text-ellipsis overflow-hidden block w-full shrink-0 text-center">
                                                        <div className="flex items-center gap-2 justify-center">
                                                            <svg width={24} height={24} viewBox="0 0 18 13" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-dark-100 w-5" >
                                                                <path d="M15.248 1.089A15.431 15.431 0 0011.534 0a9.533 9.533 0 00-.476.921 14.505 14.505 0 00-4.12 0A9.582 9.582 0 006.461 0a15.54 15.54 0 00-3.717 1.091C.395 4.405-.242 7.636.076 10.821A15.269 15.269 0 004.631 13c.369-.473.695-.974.975-1.499a9.896 9.896 0 01-1.536-.699c.13-.089.255-.18.377-.27 1.424.639 2.979.97 4.553.97 1.574 0 3.129-.331 4.553-.97.123.096.25.188.377.27a9.94 9.94 0 01-1.54.7c.28.525.607 1.026.976 1.498a15.2 15.2 0 004.558-2.178c.373-3.693-.639-6.895-2.676-9.733zM6.01 8.862c-.888 0-1.621-.767-1.621-1.712 0-.944.708-1.718 1.618-1.718.91 0 1.638.774 1.623 1.718-.016.945-.715 1.712-1.62 1.712zm5.98 0c-.889 0-1.62-.767-1.62-1.712 0-.944.708-1.718 1.62-1.718.912 0 1.634.774 1.618 1.718-.015.945-.713 1.712-1.618 1.712z" fill="currentColor"/>
                                                            </svg>
                                                            {locales.Discordに追加}
                                                        </div>
                                                    </span>
                                                </div>
                                            </button>
                                        </a>
                                    </div>
                                    <div className="max-w-[280px] lg:max-w-[560px] flex items-center justify-center pr-0 pl-0 ml-[32px]" style={{margin:`50px 0px`,WebkitBoxAlign:`center`,WebkitBoxPack:`center`}}>
                                        <div className='w-[250px] h-[250px] lg:w-[342px] lg:h-[342px] bg-cover bg-center' style={{backgroundImage:`url('/assets/img/Sglid_icon.png')`,inset:`0px`}}/>
                                    </div>
                                </div>
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
                                        <section className="gap-10 mb-5 w-full">
                                            <div className="w-full gap-5 hidden">
                                                <Badge mode="">default</Badge>
                                                <Badge mode="default">default</Badge>
                                                <Badge mode="dark">dark</Badge>
                                                <Badge mode="red">red</Badge>
                                                <Badge mode="green">green</Badge>
                                                <Badge mode="yellow">yellow</Badge>
                                                <Badge mode="indigo">indigo</Badge>
                                                <Badge mode="purple">purple</Badge>
                                                <Badge mode="pink">pink</Badge>
                                                <div className="mb-5">
                                                    <DiscordMsg type="messages">
                                                        <DiscordMsg type="message">
                                                            <DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
                                                            <DiscordMsg type="content" mode="group">
                                                                <DiscordMsg type="content" mode="logo" iconUrl={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                <DiscordMsg type="content" mode="body">
                                                                    <DiscordMsg type="content" mode="bot" userName="npm"/>
                                                                    <DIscordMsgEmbed type="embed" color={`rgb(0, 153, 255)`}>
                                                                        <DIscordMsgEmbed type="contents">
                                                                            <DIscordMsgEmbed type="div">
                                                                                <DIscordMsgEmbed type="contents" mode="author">
                                                                                    <DIscordMsgEmbed type="contents" mode="author-icon" content={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                                    <DIscordMsgEmbed type="link" content={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}>
                                                                                        Some name
                                                                                    </DIscordMsgEmbed>
                                                                                </DIscordMsgEmbed>
                                                                                <DIscordMsgEmbed type="contents" mode="title">
                                                                                Some title
                                                                                </DIscordMsgEmbed>
                                                                                <DIscordMsgEmbed type="contents" mode="description">
                                                                                Some description
                                                                                </DIscordMsgEmbed>
                                                                                <DIscordMsgEmbed type="contents" mode="fields">
                                                                                    <DIscordMsgEmbed type="contents" mode="field">
                                                                                        <DIscordMsgEmbed type="contents" mode="field-title">
                                                                                        Regular field title
                                                                                        </DIscordMsgEmbed>
                                                                                        Some value here
                                                                                    </DIscordMsgEmbed>
                                                                                    <DIscordMsgEmbed type="contents" mode="addFields">
                                                                                        <DIscordMsgEmbed type="contents" mode="field-title">
                                                                                        Inline field title
                                                                                        </DIscordMsgEmbed>
                                                                                        Some value here
                                                                                    </DIscordMsgEmbed>
                                                                                    <DIscordMsgEmbed type="contents" mode="addFields">
                                                                                        <DIscordMsgEmbed type="contents" mode="field-title">
                                                                                        Inline field title
                                                                                        </DIscordMsgEmbed>
                                                                                        Some value here
                                                                                    </DIscordMsgEmbed>
                                                                                    <DIscordMsgEmbed type="contents" mode="addFields">
                                                                                        <DIscordMsgEmbed type="contents" mode="field-title">
                                                                                        Inline field title
                                                                                        </DIscordMsgEmbed>
                                                                                        Some value here
                                                                                    </DIscordMsgEmbed>
                                                                                </DIscordMsgEmbed>
                                                                                <DIscordMsgEmbed type="contents" mode="icon" content={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                            </DIscordMsgEmbed>
                                                                            <DIscordMsgEmbed type="contents" mode="thumbnail" content={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                        </DIscordMsgEmbed>
                                                                        <DIscordMsgEmbed type="footer">
                                                                            <DIscordMsgEmbed type="footer" mode="icon" content={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                            <DIscordMsgEmbed type="footer" mode="content">
                                                                                <DIscordMsgEmbed type="timestamp"/>
                                                                            </DIscordMsgEmbed>
                                                                        </DIscordMsgEmbed>
                                                                    </DIscordMsgEmbed>
                                                                    <DiscordMsg type="content" mode="buttons">
                                                                        <DiscordMsg type="button" mode="primary" event="false">Click me?</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="primary">primary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="secondary">secondary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="success">success</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="danger">danger</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="link" content={`https://google.com`}>Link</DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </DiscordMsg>
                                                </div>
                                                <div className="mb-5">
                                                    <DiscordMsg type="messages">
                                                        <DiscordMsg type="message" mention={true}>
                                                            <DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
                                                            <DiscordMsg type="content" mode="group">
                                                                <DiscordMsg type="content" mode="logo" iconUrl={`https://static-production.npmjs.com/58a19602036db1daee0d7863c94673a4.png`}/>
                                                                <DiscordMsg type="content" mode="body">
                                                                    <DiscordMsg type="content" mode="bot" userName="npm"/>
                                                                    <DiscordMsg type="content" mode="msg">
                                                                        @user description
                                                                    </DiscordMsg>
                                                                    <DiscordMsg type="content" mode="buttons">
                                                                        <DiscordMsg type="button" mode="primary" event="false">Click me?</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="primary">primary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="secondary">secondary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="success">success</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="danger">danger</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="link" content={`https://google.com`}>Link</DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </DiscordMsg>
                                                </div>
                                                <div className="mb-5">
                                                    <DiscordMsg type="messages">
                                                        <DiscordMsg type="message">
                                                            <DiscordMsg type="interaction" cmdName={`command`} userName={`Fun117`} iconUrl={`/assets/img/@Fun117_icon.png`}/>
                                                            <DiscordMsg type="content" mode="group">
                                                                <DiscordMsg type="content" mode="logo" iconUrl={`https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png`}/>
                                                                <DiscordMsg type="content" mode="body">
                                                                    <DiscordMsg type="content" mode="bot" userName="ChatGPT"/>
                                                                    <DiscordMsg type="content" mode="msg">
                                                                        @user @mention description
                                                                    </DiscordMsg>
                                                                    <DiscordMsg type="content" mode="buttons">
                                                                        <DiscordMsg type="button" mode="primary" event="false">Click me?</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="primary">primary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="secondary">secondary</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="success">success</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="danger">danger</DiscordMsg>
                                                                        <DiscordMsg type="button" mode="link" content={`https://google.com`}>Link</DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </DiscordMsg>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - About</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "about") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "about")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`about`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }}/>
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-title">
                                                                                        このボットについて
                                                                                        </div>
                                                                                        <div className="discord-embed-description">
                                                                                            リンク</div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field">
                                                                                                <div className="discord-embed-field-title"></div>{" "}
                                                                                                ウェブサイト | サポートサーバー
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="discord-embed-description">
                                                                                            利用者</div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field">
                                                                                                <div className="discord-embed-field-title"></div>{" "}
                                                                                                79 Servers | 19910 Members
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="discord-embed-footer">
                                                                                    <span>
                                                                                        <span>2024/01/13 18:03</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={links.discordBot_sglid_supportServer_url}>サポートサーバー</DiscordMsg>
                                                                            <DiscordMsg type="button" mode="link" content={links.discordBot_add_sglid}>BOTを招待</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Counter</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "counter") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "counter")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`counter`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <DiscordMsg type="content" mode="msg">
                                                                        0
                                                                        </DiscordMsg>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="primary">+</DiscordMsg>
                                                                            <DiscordMsg type="button" mode="secondary">-</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Help</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "help") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "help")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`help`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }} />
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-title">
                                                                                        ヘルプ | Scratch (1/4)
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">/sc</div>
                                                                                                Scratchのユーザーを検索します。
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">/pro</div>
                                                                                                Scratchのプロジェクトを検索します。
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">/scratchauth</div>
                                                                                                Scratchの認証ボタンを設置します。
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="discord-embed-footer">
                                                                                    <span>
                                                                                        <span>2024/01/13 18:03</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="primary"><FontAwesomeIcon icon={faArrowLeft} /></DiscordMsg>
                                                                            <DiscordMsg type="button" mode="primary"><FontAwesomeIcon icon={faArrowRight} /></DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Janken</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "janken") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "janken")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`janken`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <FontAwesomeIcon icon={faHandFist} /> <FontAwesomeIcon icon={faHandPeace} /> <FontAwesomeIcon icon={faHand} />
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://twitter.com/intent/tweet?text=Sglid%E3%81%AE%E3%81%8A%E3%81%BF%E3%81%8F%E3%81%98%E3%81%A7%20%E5%90%89%F0%9F%99%82%E3%82%92%E5%BC%95%E3%81%84%E3%81%9F%E3%82%88%EF%BC%81%0D%0A%E3%81%BF%E3%82%93%E3%81%AA%E3%82%82%E9%81%8A%E3%82%93%E3%81%A7%E3%81%BF%E3%82%88%E3%81%86%EF%BC%81https://x.gd/sglidsite%20%20%23Sglid`}>結果をツイート（笑）</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Omikuji</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "omikuji") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "omikuji")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`omikuji`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <DiscordMsg type="content" mode="msg">
                                                                        あなたの運勢 : 吉🙂
                                                                        </DiscordMsg>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://twitter.com/intent/tweet?text=Sglid%E3%81%AE%E3%81%8A%E3%81%BF%E3%81%8F%E3%81%98%E3%81%A7%20%E5%90%89%F0%9F%99%82%E3%82%92%E5%BC%95%E3%81%84%E3%81%9F%E3%82%88%EF%BC%81%0D%0A%E3%81%BF%E3%82%93%E3%81%AA%E3%82%82%E9%81%8A%E3%82%93%E3%81%A7%E3%81%BF%E3%82%88%E3%81%86%EF%BC%81https://x.gd/sglidsite%20%20%23Sglid`}>結果をツイート（笑）</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Ping</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "ping") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "ping")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`ping`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <span>pong!</span><br/>
                                                                        現在のpingは<span className="markdown-code">188ms</span>です！
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Play</h1>
                                                        <div>
                                                            <p>
                                                                <Badge mode="dark">{locales.不安定}</Badge>
                                                                {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "play") && (
                                                                    <>{locales_commands.find(cmd => cmd.commandName === "play")!.description}</>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`play`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <h1 className="font-bold">キュー</h1>
                                                                        <DiscordMsg type="content" mode="msg">
                                                                        キューに追加しました！
                                                                        </DiscordMsg>
                                                                        <DiscordMsg type="content" mode="msg">
                                                                        タイトル：Scratch!
                                                                        </DiscordMsg>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://www.youtube.com/watch?v=98awWpkx9UM`}>▶️ YouTubeで見る</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                            <DiscordMsg type="message" mention={true}>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <div className="discord-author-avatar"></div>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <span className="markdown-code">Scratch!</span> を再生中<FontAwesomeIcon icon={faMusic} />
                                                                        <br/>
                                                                        長さ：<span className="markdown-code">0 : 58</span>
                                                                        <DiscordMsg type="content" mode="msg">
                                                                        追加者：@Guest
                                                                        </DiscordMsg>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://www.youtube.com/watch?v=98awWpkx9UM`}>▶️ YouTubeで見る</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Pro</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "pro") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "pro")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`pro`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }}/>
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-title">
                                                                                            <a href="https://scratch.mit.edu/projects/708711034" target="_blank" rel="noopener noreferrer">
                                                                                            ビル経営ゲームv5.6.2
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="discord-embed-description">
                                                                                            by{" "}
                                                                                            <a href="https://scratch.mit.edu/users/Masaabu-YT" target="_block">
                                                                                                Masaabu-YT
                                                                                            </a>
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">作成日</div>
                                                                                                2022-06-24
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">共有日</div>
                                                                                                2022-10-01
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">最終更新日</div>
                                                                                                2023-02-09
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title"><FontAwesomeIcon icon={faHeart} />ハート数</div>
                                                                                                5396
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title"><FontAwesomeIcon icon={faStar} />フォバ数</div>
                                                                                                5275
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title"><FontAwesomeIcon icon={faEye} />参照数</div>
                                                                                                305202
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <img src="https://uploads.scratch.mit.edu/get_image/project/708711034_480x360.png" className="discord-embed-thumbnail" alt="img" />
                                                                                </div>
                                                                                <div className="discord-embed-footer">
                                                                                    <img src="/assets/img/Sglid_icon.png" className="discord-embed-footer-icon" alt="icon"/>
                                                                                    <span>
                                                                                        <span>一部の情報が古い場合があります</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://scratch.mit.edu/projects/708711034`}>Scratchで見る</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Qplay</h1>
                                                        <div>
                                                            <p>
                                                                <Badge mode="dark">{locales.不安定}</Badge>
                                                                {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "qplay") && (
                                                                    <>{locales_commands.find(cmd => cmd.commandName === "qplay")!.description}</>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`qplay`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <h1>NCSを再生中<FontAwesomeIcon icon={faMusic} /></h1>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Queue</h1>
                                                        <div>
                                                            <p>
                                                                <Badge mode="dark">{locales.不安定}</Badge>
                                                                {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "queue") && (
                                                                    <>{locales_commands.find(cmd => cmd.commandName === "queue")!.description}</>
                                                                )}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`queue`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <h1 className=" text-red-600">
                                                                            <FontAwesomeIcon icon={faCircleExclamation} /> アプリケーションが応答しませんでした
                                                                        </h1>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Sc</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "sc") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "sc")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`sc`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }}/>
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-title">
                                                                                        Masaabu-YTのステータス
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faUser} />{" "}フォロワー数
                                                                                                    </h1>
                                                                                                </div>
                                                                                                4735
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faUser} />{" "}フォロー中
                                                                                                    </h1>
                                                                                                </div>
                                                                                                8
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faFlag} />{" "}ステータス
                                                                                                    </h1>
                                                                                                </div>
                                                                                                Scratcher
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faHeart} />{" "}ハート数
                                                                                                    </h1>
                                                                                                </div>
                                                                                                24567
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faStar} />{" "}ファボ数
                                                                                                    </h1>
                                                                                                </div>
                                                                                                23893
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faEye} />{" "}参照数
                                                                                                    </h1>
                                                                                                </div>
                                                                                                985555
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faFlagCheckered} />{" "}参加日
                                                                                                    </h1>
                                                                                                </div>
                                                                                                2021-02-25
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faEarthAsia} />{" "}地域
                                                                                                    </h1>
                                                                                                </div>
                                                                                                Japan
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        <FontAwesomeIcon icon={faIdBadge} />{" "}ID
                                                                                                    </h1>
                                                                                                </div>
                                                                                                72530647
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <img src="https://uploads.scratch.mit.edu/get_image/user/72530647_90x90.png" className="discord-embed-thumbnail" alt="img" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }}/>
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-title">
                                                                                        Masaabu-YTのプロフィール
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        私について
                                                                                                    </h1>
                                                                                                </div>
                                                                                                フォロバなしで生きていく暇人<br/>
                                                                                                <br/>
                                                                                                23/08/25　フォロワー4000人突破！<br/>
                                                                                                22/11/28　フォロワー3000人突破！<br/>
                                                                                                22/10/21　フォロワー2000人突破！<br/>
                                                                                                22/07/15　フォロワー1000人突破！<br/>
                                                                                                <br/>
                                                                                                dango
                                                                                            </div>
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                    私が取り組んでいること
                                                                                                    </h1>
                                                                                                </div>
                                                                                                宣伝やめてね(‾◡◝)
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="discord-embed-footer">
                                                                                    <img src="/assets/img/Sglid_icon.png" className="discord-embed-footer-icon" alt="icon"/>
                                                                                    <span>
                                                                                        <span>一部の情報が古い場合があります</span>
                                                                                    </span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            <DiscordMsg type="button" mode="link" content={`https://scratch.mit.edu/users/Masaabu-YT`}>Scratchで見る</DiscordMsg>
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="box w-full">
                                                <div className="flex flex-col gap-4">
                                                    <div>
                                                        <h1 className="text-white font-bold text-[30px]">{locales.コマンド} - Server</h1>
                                                        <div>
                                                            {locales_commands && locales_commands.length > 0 && locales_commands.find(cmd => cmd.commandName === "server") && (
                                                                <p>{locales_commands.find(cmd => cmd.commandName === "server")!.description}</p>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <DiscordMsg type="messages">
                                                            <DiscordMsg type="message">
                                                                <DiscordMsg type="interaction" cmdName={`server`} userName={`Guest`} iconUrl={`/assets/img/discord/icon/discord_guest-green.png`}/>
                                                                <DiscordMsg type="content" mode="group">
                                                                    <DiscordMsg type="content" mode="logo" iconUrl={`/assets/img/Sglid_icon.png`}/>
                                                                    <DiscordMsg type="content" mode="body">
                                                                        <DiscordMsg type="content" mode="bot" userName="Sglid"/>
                                                                        <div className="discord-embed">
                                                                            <div className="discord-embed-left-border" style={{ backgroundColor: "rgb(0, 153, 255)" }}/>
                                                                            <div className="discord-embed-container">
                                                                                <div className="discord-embed-content">
                                                                                    <div>
                                                                                        <div className="discord-embed-author">
                                                                                            <img src="https://images-ext-2.discordapp.net/external/Szs5SpYpi1D7lh9uQjS7bLyL28cIvEDIy58Ga8o76L4/https/cdn.discordapp.com/icons/1002922339287187456/a319c78e2c689234316944eb071b8438.webp" className="discord-embed-author-icon" alt="img"/>
                                                                                            Masaabu鯖🥦
                                                                                        </div>
                                                                                        <div className="discord-embed-fields">
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                        サーバーID
                                                                                                    </h1>
                                                                                                </div>
                                                                                                1002922339287187456
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                    メンバー数
                                                                                                    </h1>
                                                                                                </div>
                                                                                                109人
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                    サーバー主
                                                                                                    </h1>
                                                                                                </div>
                                                                                                <span className="discord-mention">@𝙈𝙖𝙨𝙖𝙖𝙗𝙪 [通称: まっちゃん]</span>
                                                                                            </div>
                                                                                            <div className="discord-embed-field discord-embed-field-inline">
                                                                                                <div className="discord-embed-field-title">
                                                                                                    <h1 className="text-white font-bold">
                                                                                                    ブースト
                                                                                                    </h1>
                                                                                                </div>
                                                                                                0ブースト
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                    <img src="https://cdn.discordapp.com/icons/1002922339287187456/a319c78e2c689234316944eb071b8438.webp" className="discord-embed-thumbnail" alt="img" />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <DiscordMsg type="content" mode="buttons">
                                                                            
                                                                        </DiscordMsg>
                                                                    </DiscordMsg>
                                                                </DiscordMsg>
                                                            </DiscordMsg>
                                                        </DiscordMsg>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>
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
                                <h1 className='font-bold text-4xl'>{locales.Sglid}</h1>
                                <p className='p-5'>{locales['サイトは現在限定公開です。表示するにはパスワード認証を行う必要があります。']}</p>
                            </div>
                            <div className='gap-4 flex flex-col justify-center items-center'>
                                <input type='text' placeholder='パスワード' className='flex min-h-[20px] min-w-[200px] lg:w-[400px] rounded-md border border-zinc-700 border-input bg-zinc-900 px-3 py-2 mt-[10px] text-sm ring-offset-background focus-visible:outline-none' onChange={(e) => setViewLocked_password(e.target.value)}/>
                                <button className='button_blue_1' onClick={() => updatePassword(ViewLocked_password)}>{locales.開く}</button>
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

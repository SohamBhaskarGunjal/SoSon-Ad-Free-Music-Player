"use client";

/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/purity */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState, useEffect, useMemo } from "react";
import Clock from "./components/Clock";
import MusicPlayer, { Track } from "./components/MusicPlayer";
import LikeButton from "./components/LikeButton";

interface ArtistInfo {
  name: string;
  label: string;
  image: string | null;
}

const ARTISTS: ArtistInfo[] = [
  { name: "All", label: "all", image: null },
  { name: "Sidhu Moosewala", label: "sidhu_moose_wala", image: "/artists/sidhu.png" },
  { name: "Karan Aujla", label: "karan_aujla", image: "/artists/karan.png" },
  { name: "Diljit Dosanjh", label: "diljit_dosanjh", image: "/artists/diljit.png" },
  { name: "Honey Singh", label: "honey_singh", image: "/artists/Honey Singh.png" },
  { name: "Sumit Goswami", label: "sumit_goswami", image: "/artists/sumit.png" },
  { name: "Cheema Y", label: "cheema_y", image: "/artists/cheema.png" },
  { name: "Guru Randhawa", label: "guru_randhawa", image: "/artists/guru.png" },
  { name: "Shubh", label: "shubh", image: "/artists/shubh.png" },
];

const TRACKS: Track[] = [
  // --- CHEEMA Y ---
  {
    id: "cheema-y-playlist-jukebox",
    title: "Cheema Y Best Songs Playlist Jukebox",
    artist: "Cheema Y",
    film: "Punjabi Hits 2026 Jukebox",
    year: 2026,
    duration: 1671,
    audioUrl: "/audio/cheema_y.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/cheema.png"
  },

  // --- GURU RANDHAWA ---
  {
    id: "guru-randhawa-playlist-jukebox",
    title: "TOP 10 Best of Guru Randhawa Jukebox",
    artist: "Guru Randhawa",
    film: "Bollywood & Punjabi Hits Collection",
    year: 2024,
    duration: 1718,
    audioUrl: "/audio/guru_randhawa.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/guru.png"
  },

  // --- SHUBH ---
  {
    id: "shubh-playlist-jukebox",
    title: "Shubh Best Songs Playlist Jukebox",
    artist: "Shubh",
    film: "Full Punjabi Hits Jukebox 2025",
    year: 2025,
    duration: 1479,
    audioUrl: "/audio/shubh.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/shubh.png"
  },

  // --- ROMANTIC STYLE ---
  {
    id: "style-romantic-emraan-hashmi",
    title: "Best of Emraan Hashmi Romantic Hits Jukebox",
    artist: "Emraan Hashmi & Various Artists",
    film: "Top 12 Romantic & Melodic Hits",
    year: 2024,
    duration: 3867,
    audioUrl: "/audio/romantic.mp3",
    style: "Romantic",
    mood: "Chill",
    coverUrl: "/bg/scene-wide.png"
  },
  // --- LATE NIGHT DRIVE STYLE ---
  {
    id: "style-late-night-drive-jukebox",
    title: "Best Late Night Drive English Playlist Jukebox",
    artist: "Various International Artists",
    film: "Late Night Drive Collection",
    year: 2024,
    duration: 1097,
    audioUrl: "/audio/late_night_drive.mp3",
    style: "Late Night Drive",
    mood: "Chill",
    coverUrl: "/bg/scene-wide.png"
  },
  // --- ROAD TRIP STYLE ---
  {
    id: "style-road-trip-jukebox",
    title: "Bollywood Road Trip & Traveling Songs Jukebox",
    artist: "Various Bollywood Artists",
    film: "Road Trip Audio Jukebox",
    year: 2024,
    duration: 4780,
    audioUrl: "/audio/road_trip.mp3",
    style: "Road Trip",
    mood: "Energetic",
    coverUrl: "/bg/scene-wide.png"
  },
  // --- SOUTH MUSIC STYLE ---
  {
    id: "style-south-1",
    title: "Instagram Trending South Indian Hits Mashup",
    artist: "South Indian Artists",
    film: "Tamil • Telugu • Malayalam • Kannada Hits",
    year: 2026,
    duration: 2385,
    audioUrl: "/audio/south.mp3",
    style: "South Music",
    mood: "Energetic",
    coverUrl: "/bg/scene-wide.png"
  },
  {
    id: "style-south-2",
    title: "South Indian Chill & Romantic Hits Jukebox",
    artist: "South Indian Artists",
    film: "South Love Collection",
    year: 2026,
    duration: 1171,
    audioUrl: "/audio/south2.mp3",
    style: "South Music",
    mood: "Chill",
    coverUrl: "/bg/scene-wide.png"
  },
  // --- RETRO STYLE ---
  {
    id: "style-retro-vintage",
    title: "Retro Vintage Soul Playlist Jukebox",
    artist: "Vintage Old School Artists",
    film: "Retro Vintage Collection",
    year: 2024,
    duration: 1075,
    audioUrl: "/audio/retro.mp3",
    style: "Retro",
    mood: "Chill",
    coverUrl: "/bg/scene-wide.png"
  },
  // --- SIDHU MOOSEWALA ALL TRACKS ---
  {
    id: "sidhu-moosewala-hits",
    title: "Best Of Sidhu Moose Wala Jukebox",
    artist: "Sidhu Moosewala",
    film: "All Hits Of Sidhu Moose Wala",
    year: 2024,
    audioUrl: "/audio/sidhu_moosewala/Best Of Sidhu Moose Wala - Latest Punjabi Songs Sidhu Moose Wala Songs - All Hits Of Sidhu Songs.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-295",
    title: "295",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/295.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-so-high",
    title: "So High",
    artist: "Sidhu Moosewala & BYG BYRD",
    film: "PBX 1",
    year: 2017,
    audioUrl: "/audio/sidhu_moosewala/So High.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-the-last-ride",
    title: "The Last Ride",
    artist: "Sidhu Moosewala & Wazir Patar",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/sidhu_moosewala/The Last Ride.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-levels",
    title: "Levels",
    artist: "Sidhu Moosewala & Sunny Malton",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/sidhu_moosewala/Levels.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-legend",
    title: "Legend",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/sidhu_moosewala/Legend.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-bambiha-bole",
    title: "Bambiha Bole",
    artist: "Sidhu Moosewala & Amrit Maan",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/Bambiha Bole.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-old-skool",
    title: "Old Skool",
    artist: "Sidhu Moosewala, Prem Dhillon & Naseeb",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/Old Skool.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-same-beef",
    title: "Same Beef",
    artist: "Sidhu Moosewala & Bohemia",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/sidhu_moosewala/Same Beef.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-jatt-da-muqabala",
    title: "Jatt Da Muqabala",
    artist: "Sidhu Moosewala",
    film: "PBX 1",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Jatt Da Muqabala.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-never-fold",
    title: "Never Fold",
    artist: "Sidhu Moosewala & Sunny Malton",
    film: "No Name",
    year: 2022,
    audioUrl: "/audio/sidhu_moosewala/Never Fold.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-dhakka",
    title: "Dhakka",
    artist: "Sidhu Moosewala & Afsana Khan",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/sidhu_moosewala/Dhakka.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-bitch-im-back",
    title: "Bitch I'm Back",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Bitch I'm Back.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-built-different",
    title: "Built Different",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Built Different.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-burberry",
    title: "Burberry",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Burberry.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-calaboose",
    title: "Calaboose",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Calaboose.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-celebrity-killer",
    title: "Celebrity Killer",
    artist: "Sidhu Moosewala & Tion Wayne",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Celebrity Killer.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-dear-mama",
    title: "Dear Mama",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/Dear Mama.mp3",
    style: "Hip Hop",
    mood: "Nostalgic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-dollar",
    title: "Dollar",
    artist: "Sidhu Moosewala",
    film: "Dakuaan Da Munda",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Dollar.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-east-side-flow",
    title: "East Side Flow",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/sidhu_moosewala/East Side Flow.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-everybody-hurts",
    title: "Everybody Hurts",
    artist: "Sidhu Moosewala",
    film: "No Name",
    year: 2022,
    audioUrl: "/audio/sidhu_moosewala/Everybody Hurts.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-famous",
    title: "Famous",
    artist: "Sidhu Moosewala",
    film: "PBX 1",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Famous.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-g-wagon",
    title: "G-Wagon",
    artist: "Sidhu Moosewala & Gurlez Akhtar",
    film: "Single",
    year: 2017,
    audioUrl: "/audio/sidhu_moosewala/G-Wagon.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-goat",
    title: "GOAT",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/GOAT.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-game",
    title: "Game",
    artist: "Sidhu Moosewala & Shooter Kahlon",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/Game.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-issa-jatt",
    title: "Issa Jatt",
    artist: "Sidhu Moosewala & Sunny Malton",
    film: "Single",
    year: 2017,
    audioUrl: "/audio/sidhu_moosewala/Issa Jatt.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-just-listen",
    title: "Just Listen",
    artist: "Sidhu Moosewala & Sunny Malton",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Just Listen.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-malwa-block",
    title: "Malwa Block",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Malwa Block.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-my-block",
    title: "My Block",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/My Block.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-signed-to-god",
    title: "Signed to God",
    artist: "Sidhu Moosewala",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/Signed to God.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-these-days",
    title: "These Days",
    artist: "Sidhu Moosewala & Boer",
    film: "Moosetape",
    year: 2021,
    audioUrl: "/audio/sidhu_moosewala/These Days.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-tibeyan-da-putt",
    title: "Tibeyan Da Putt",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/sidhu_moosewala/Tibeyan Da Putt.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-tochan",
    title: "Tochan",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Tochan.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },
  {
    id: "sidhu-warning-shots",
    title: "Warning Shots",
    artist: "Sidhu Moosewala",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/sidhu_moosewala/Warning Shots.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sidhu.png"
  },

  // --- CHEEMA Y ---
  {
    id: "cheema-y-jukebox",
    title: "Cheema Y",
    artist: "Cheema Y",
    film: "Best Songs Jukebox",
    year: 2026,
    audioUrl: "/audio/cheema_y.mp3",
    category: "Car",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/cheema.png"
  },

  // --- GURU RANDHAWA ---
  {
    id: "guru-randhawa-top10",
    title: "Guru Randhawa",
    artist: "Guru Randhawa",
    film: "Top Hits Jukebox",
    year: 2023,
    audioUrl: "/audio/guru_randhawa.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/guru.png"
  },

  // --- SHUBH ---
  {
    id: "shubh-full-jukebox",
    title: "Shubh",
    artist: "Shubh",
    film: "Full Hits Jukebox",
    year: 2025,
    audioUrl: "/audio/shubh.mp3",
    style: "Hip Hop",
    mood: "Nostalgic",
    coverUrl: "/artists/shubh.png"
  },

  // --- SOUTH MUSIC ---
  {
    id: "south-indian-hits",
    title: "South Indian Hits Mashup",
    artist: "Tamil • Telugu • Malayalam • Kannada",
    film: "Trending South Indian Songs",
    year: 2026,
    audioUrl: "/audio/south.mp3",
    style: "South Music",
    mood: "Energetic"
  },



  // --- RETRO VINTAGE MUSIC ---
  {
    id: "retro-vintage-souls",
    title: "Retro Playlist for Vintage Souls",
    artist: "Vintage Old School Hits",
    film: "Classic Retro Playlist",
    year: 2024,
    audioUrl: "/audio/retro.mp3",
    style: "Retro",
    mood: "Nostalgic"
  },

  // --- ADDITIONAL CURATED MIXES ---
  {
    id: "hip-hop-legendary",
    title: "LEGENDARY OLD SCHOOL HIP HOP MIX",
    artist: "Hip Hop Legends",
    film: "Snoop Dogg, Dr. Dre, 50 Cent, 2Pac, Ice Cube, Eminem & More",
    year: 2024,
    audioUrl: "/audio/hip_hop.mp3",
    style: "Hip Hop",
    mood: "Energetic"
  },
  {
    id: "road-trip-hits",
    title: "Bollywood Road Trip Playlist",
    artist: "Various Artists",
    film: "Long Drive Songs",
    year: 2024,
    audioUrl: "/audio/road_trip.mp3",
    style: "Road Trip",
    mood: "Chill"
  },
  {
    id: "late-night-drive",
    title: "Best Late Night Drive English",
    artist: "Various Artists",
    film: "Late Night Drive Hits",
    year: 2024,
    audioUrl: "/audio/late_night_drive.mp3",
    style: "Late Night Drive",
    mood: "Nostalgic"
  },

  // --- FESTIVALS OF FREEDOM (DESH BHAKTI) ---
  {
    id: "teri-mitti-kesari",
    title: "Teri Mitti",
    artist: "B Praak & Arko",
    film: "Kesari",
    year: 2019,
    audioUrl: "/audio/teri_mitti.mp3",
    style: "Festivals Of Freedom",
    mood: "Patriotic"
  },
  {
    id: "ae-watan-raazi",
    title: "Ae Watan",
    artist: "Arijit Singh & Shankar-Ehsaan-Loy",
    film: "Raazi",
    year: 2018,
    audioUrl: "/audio/ae_watan.mp3",
    style: "Festivals Of Freedom",
    mood: "Patriotic"
  },
  {
    id: "lehra-do-83",
    title: "Lehra Do",
    artist: "Arijit Singh & Pritam",
    film: "83",
    year: 2021,
    audioUrl: "/audio/lehra_do.mp3",
    style: "Festivals Of Freedom",
    mood: "Patriotic"
  },
  {
    id: "challa-uri",
    title: "Challa (Main Lad Jaana)",
    artist: "Romy, Vivek & Shashwat Sachdev",
    film: "URI: The Surgical Strike",
    year: 2019,
    audioUrl: "/audio/challa_uri.mp3",
    style: "Festivals Of Freedom",
    mood: "Energetic"
  },
  {
    id: "maati-ko-maa-mission-majnu",
    title: "Maati Ko Maa Kehte Hain",
    artist: "Sonu Nigam & Rochak Kohli",
    film: "Mission Majnu",
    year: 2023,
    audioUrl: "/audio/maati_ko_maa.mp3",
    style: "Festivals Of Freedom",
    mood: "Patriotic"
  },
  {
    id: "vijayi-bhava-manikarnika",
    title: "Vijayi Bhava",
    artist: "Shankar Mahadevan & SEL",
    film: "Manikarnika",
    year: 2019,
    audioUrl: "/audio/vijayi_bhava.mp3",
    style: "Festivals Of Freedom",
    mood: "Patriotic"
  },
  {
    id: "vande-mataram-abcd2",
    title: "Vande Mataram",
    artist: "Badshah & Daler Mehndi",
    film: "Disney's ABCD 2",
    year: 2015,
    audioUrl: "/audio/vande_mataram_abcd2.mp3",
    style: "Festivals Of Freedom",
    mood: "Energetic"
  },

  // --- KARAN AUJLA ALL 32 SONGS ---
  {
    id: "karan-aujla-tauba-tauba",
    title: "Tauba Tauba",
    artist: "Karan Aujla",
    film: "Bad Newz",
    year: 2024,
    audioUrl: "/audio/karan_aujla/Tauba Tauba.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-softly",
    title: "Softly",
    artist: "Karan Aujla",
    film: "Making Memories",
    year: 2023,
    audioUrl: "/audio/karan_aujla/Softly.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-52-bars",
    title: "52 Bars",
    artist: "Karan Aujla",
    film: "Four You EP",
    year: 2023,
    audioUrl: "/audio/karan_aujla/52 Bars.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-winning-speech",
    title: "Winning Speech",
    artist: "Karan Aujla",
    film: "Single",
    year: 2024,
    audioUrl: "/audio/karan_aujla/Winning Speech.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-100-million",
    title: "100 Million",
    artist: "Karan Aujla & DIVINE",
    film: "Single",
    year: 2024,
    audioUrl: "/audio/karan_aujla/100 Million.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-admirin-you",
    title: "Admirin' You",
    artist: "Karan Aujla & Ikky",
    film: "Making Memories",
    year: 2023,
    audioUrl: "/audio/karan_aujla/Admirin' You.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-antidote",
    title: "Antidote",
    artist: "Karan Aujla",
    film: "Single",
    year: 2024,
    audioUrl: "/audio/karan_aujla/Antidote.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-chithiyaan",
    title: "Chithiyaan",
    artist: "Karan Aujla",
    film: "Single",
    year: 2021,
    audioUrl: "/audio/karan_aujla/Chithiyaan.mp3",
    style: "Hip Hop",
    mood: "Nostalgic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-chitta-kurta",
    title: "Chitta Kurta",
    artist: "Karan Aujla & Gurlez Akhtar",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/karan_aujla/Chitta Kurta.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-courtside",
    title: "Courtside",
    artist: "Karan Aujla",
    film: "Single",
    year: 2024,
    audioUrl: "/audio/karan_aujla/Courtside.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-dont-look",
    title: "Don't Look",
    artist: "Karan Aujla",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/karan_aujla/Don't Look.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-dont-worry",
    title: "Don't Worry",
    artist: "Karan Aujla & Gurlez Akhtar",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/karan_aujla/Don't Worry.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-facts",
    title: "Facts",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Facts.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-gangsta",
    title: "Gangsta",
    artist: "Karan Aujla & YG",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/karan_aujla/Gangsta.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-here-there",
    title: "Here & There",
    artist: "Karan Aujla",
    film: "Bacthafucup",
    year: 2021,
    audioUrl: "/audio/karan_aujla/Here & There.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-hint",
    title: "Hint",
    artist: "Karan Aujla",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/karan_aujla/Hint.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-hukam",
    title: "Hukam",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Hukam.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-idk-how",
    title: "IDK How",
    artist: "Karan Aujla",
    film: "Four You EP",
    year: 2023,
    audioUrl: "/audio/karan_aujla/IDK How.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-jee-ni-lagda",
    title: "Jee Ni Lagda",
    artist: "Karan Aujla",
    film: "Making Memories",
    year: 2023,
    audioUrl: "/audio/karan_aujla/Jee Ni Lagda.mp3",
    style: "Hip Hop",
    mood: "Nostalgic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-jhanjhar",
    title: "Jhanjhar",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Jhanjhar.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-kya-baat-aa",
    title: "Kya Baat Aa",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Kya Baat Aa.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-let-em-play",
    title: "Let 'Em Play",
    artist: "Karan Aujla",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/karan_aujla/Let 'Em Play.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-mexico",
    title: "Mexico",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Mexico.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-nothing",
    title: "Nothing",
    artist: "Karan Aujla",
    film: "Way Ahead",
    year: 2022,
    audioUrl: "/audio/karan_aujla/Nothing.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-on-top",
    title: "On Top",
    artist: "Karan Aujla",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/karan_aujla/On Top.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-players",
    title: "Players",
    artist: "Karan Aujla & Badshah",
    film: "3:00 AM Session",
    year: 2022,
    audioUrl: "/audio/karan_aujla/Players.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-pyaar",
    title: "Pyaar",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Pyaar.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-red-eyes",
    title: "Red Eyes",
    artist: "Karan Aujla & Gurlez Akhtar",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/Red Eyes.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-rim-vs-jhanjhar",
    title: "Rim vs Jhanjhar",
    artist: "Karan Aujla",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/karan_aujla/Rim vs Jhanjhar.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-take-notes",
    title: "Take Notes",
    artist: "Karan Aujla",
    film: "Single",
    year: 2023,
    audioUrl: "/audio/karan_aujla/Take Notes.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-white-brown-black",
    title: "White Brown Black",
    artist: "Karan Aujla & Avvy Sra",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/karan_aujla/White Brown Black.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },
  {
    id: "karan-aujla-white-white",
    title: "White White",
    artist: "Karan Aujla",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/karan_aujla/White White.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/karan.png"
  },

  // --- DILJIT DOSANJH ALL 30 SONGS ---
  {
    id: "diljit-born-to-shine",
    title: "Born to Shine",
    artist: "Diljit Dosanjh",
    film: "G.O.A.T.",
    year: 2020,
    audioUrl: "/audio/diljit_dosanjh/Born to Shine.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-goat",
    title: "G.O.A.T.",
    artist: "Diljit Dosanjh",
    film: "G.O.A.T.",
    year: 2020,
    audioUrl: "/audio/diljit_dosanjh/G.O.A.T..mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-lover",
    title: "Lover",
    artist: "Diljit Dosanjh",
    film: "MoonChild Era",
    year: 2021,
    audioUrl: "/audio/diljit_dosanjh/Lover.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-kinni-kinni",
    title: "Kinni Kinni",
    artist: "Diljit Dosanjh",
    film: "Ghost",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Kinni Kinni.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-5-taara",
    title: "5 Taara",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2015,
    audioUrl: "/audio/diljit_dosanjh/5 Taara.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-aura",
    title: "Aura",
    artist: "Diljit Dosanjh",
    film: "Ghost",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Aura.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-black-white",
    title: "Black & White",
    artist: "Diljit Dosanjh",
    film: "MoonChild Era",
    year: 2021,
    audioUrl: "/audio/diljit_dosanjh/Black & White.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-case",
    title: "Case",
    artist: "Diljit Dosanjh",
    film: "Ghost",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Case.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-clash",
    title: "Clash",
    artist: "Diljit Dosanjh",
    film: "G.O.A.T.",
    year: 2020,
    audioUrl: "/audio/diljit_dosanjh/Clash.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-do-you-know",
    title: "Do You Know",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2016,
    audioUrl: "/audio/diljit_dosanjh/Do You Know.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-hass-hass",
    title: "Hass Hass",
    artist: "Diljit Dosanjh & Sia",
    film: "Single",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Hass Hass.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-high-end",
    title: "High End",
    artist: "Diljit Dosanjh",
    film: "El Sueño",
    year: 2018,
    audioUrl: "/audio/diljit_dosanjh/High End.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-jind-mahi",
    title: "Jind Mahi",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/diljit_dosanjh/Jind Mahi.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-khutti",
    title: "Khutti",
    artist: "Diljit Dosanjh & Crew",
    film: "Crew",
    year: 2024,
    audioUrl: "/audio/diljit_dosanjh/Khutti.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-laembadgini",
    title: "Laembadgini",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2016,
    audioUrl: "/audio/diljit_dosanjh/Laembadgini.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-lalkara",
    title: "Lalkara",
    artist: "Diljit Dosanjh & Sultaan",
    film: "Ghost",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Lalkara.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-lemonade",
    title: "Lemonade",
    artist: "Diljit Dosanjh",
    film: "Drive",
    year: 2022,
    audioUrl: "/audio/diljit_dosanjh/Lemonade.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-magic",
    title: "Magic",
    artist: "Diljit Dosanjh",
    film: "Ghost",
    year: 2023,
    audioUrl: "/audio/diljit_dosanjh/Magic.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-muchh",
    title: "Muchh",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2019,
    audioUrl: "/audio/diljit_dosanjh/Muchh.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-muhammad-ali",
    title: "Muhammad Ali",
    artist: "Diljit Dosanjh",
    film: "Roar",
    year: 2019,
    audioUrl: "/audio/diljit_dosanjh/Muhammad Ali.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-nain-matakka",
    title: "Nain Matakka",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2024,
    audioUrl: "/audio/diljit_dosanjh/Nain Matakka.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-naina",
    title: "Naina",
    artist: "Diljit Dosanjh & Badshah",
    film: "Crew",
    year: 2024,
    audioUrl: "/audio/diljit_dosanjh/Naina.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-patiala-peg",
    title: "Patiala Peg",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2014,
    audioUrl: "/audio/diljit_dosanjh/Patiala Peg.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-peaches",
    title: "Peaches",
    artist: "Diljit Dosanjh",
    film: "Drive",
    year: 2022,
    audioUrl: "/audio/diljit_dosanjh/Peaches.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-proper-patola",
    title: "Proper Patola",
    artist: "Diljit Dosanjh & Badshah",
    film: "Namaste England",
    year: 2018,
    audioUrl: "/audio/diljit_dosanjh/Proper Patola.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-raat-di-gedi",
    title: "Raat Di Gedi",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2017,
    audioUrl: "/audio/diljit_dosanjh/Raat Di Gedi.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-sauda-khara-khara",
    title: "Sauda Khara Khara",
    artist: "Diljit Dosanjh & Sukhbir",
    film: "Good Newwz",
    year: 2019,
    audioUrl: "/audio/diljit_dosanjh/Sauda Khara Khara.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-track-suit",
    title: "Track Suit",
    artist: "Diljit Dosanjh & Nimrat Khaira",
    film: "G.O.A.T.",
    year: 2020,
    audioUrl: "/audio/diljit_dosanjh/Track Suit.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-umbrella",
    title: "Umbrella",
    artist: "Diljit Dosanjh",
    film: "Single",
    year: 2021,
    audioUrl: "/audio/diljit_dosanjh/Umbrella.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },
  {
    id: "diljit-vibe",
    title: "Vibe",
    artist: "Diljit Dosanjh",
    film: "MoonChild Era",
    year: 2021,
    audioUrl: "/audio/diljit_dosanjh/Vibe.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/diljit.png"
  },

  // --- HONEY SINGH ALL 39 SONGS ---
  {
    id: "honey-singh-blue-eyes",
    title: "Blue Eyes",
    artist: "Honey Singh",
    film: "Single",
    year: 2013,
    audioUrl: "/audio/honey_singh/Blue Eyes.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-desi-kalakaar",
    title: "Desi Kalakaar",
    artist: "Honey Singh",
    film: "Desi Kalakaar",
    year: 2014,
    audioUrl: "/audio/honey_singh/Desi Kalakaar.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-love-dose",
    title: "Love Dose",
    artist: "Honey Singh",
    film: "Desi Kalakaar",
    year: 2014,
    audioUrl: "/audio/honey_singh/Love Dose.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-brown-rang",
    title: "Brown Rang",
    artist: "Honey Singh",
    film: "International Villager",
    year: 2011,
    audioUrl: "/audio/honey_singh/Brown Rang.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-dope-shope",
    title: "Dope Shope",
    artist: "Honey Singh & Deep Money",
    film: "International Villager",
    year: 2011,
    audioUrl: "/audio/honey_singh/Dope Shope.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-millionaire",
    title: "Millionaire",
    artist: "Honey Singh",
    film: "Glory",
    year: 2024,
    audioUrl: "/audio/honey_singh/Millionaire.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-payal",
    title: "Payal",
    artist: "Honey Singh & Paradox",
    film: "Glory",
    year: 2024,
    audioUrl: "/audio/honey_singh/Payal.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-aankhon-aankhon",
    title: "Aankhon Aankhon",
    artist: "Honey Singh",
    film: "Bhaag Johnny",
    year: 2015,
    audioUrl: "/audio/honey_singh/Aankhon Aankhon.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-angreji-beat",
    title: "Angreji Beat",
    artist: "Honey Singh & Gippy Grewal",
    film: "Cocktail",
    year: 2012,
    audioUrl: "/audio/honey_singh/Angreji Beat.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-begani-naar-buri",
    title: "Begani Naar Buri",
    artist: "Honey Singh",
    film: "International Villager",
    year: 2011,
    audioUrl: "/audio/honey_singh/Begani Naar Buri.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-birthday-bash",
    title: "Birthday Bash",
    artist: "Honey Singh & Alfaaz",
    film: "Dilliwaali Zaalim Girlfriend",
    year: 2015,
    audioUrl: "/audio/honey_singh/Birthday Bash.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-blue-hai-paani-paani",
    title: "Blue Hai Paani Paani (Sunny Sunny)",
    artist: "Honey Singh & Neha Kakkar",
    film: "Yaariyan",
    year: 2014,
    audioUrl: "/audio/honey_singh/Blue Hai Paani Paani.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-break-up-party",
    title: "Break Up Party",
    artist: "Honey Singh & Leo",
    film: "Single",
    year: 2012,
    audioUrl: "/audio/honey_singh/Break Up Party.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-bring-me-back",
    title: "Bring Me Back",
    artist: "Honey Singh",
    film: "Single",
    year: 2013,
    audioUrl: "/audio/honey_singh/Bring Me Back.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-chaar-botal-vodka",
    title: "Chaar Botal Vodka",
    artist: "Honey Singh",
    film: "Ragini MMS 2",
    year: 2014,
    audioUrl: "/audio/honey_singh/Chaar Botal Vodka.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-chhote-chhote-peg",
    title: "Chhote Chhote Peg",
    artist: "Honey Singh, Neha Kakkar & Navraj Hans",
    film: "Sonu Ke Titu Ki Sweety",
    year: 2018,
    audioUrl: "/audio/honey_singh/Chhote Chhote Peg.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-dheere-dheere",
    title: "Dheere Dheere",
    artist: "Honey Singh",
    film: "Single",
    year: 2015,
    audioUrl: "/audio/honey_singh/Dheere Dheere.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-dil-chori",
    title: "Dil Chori",
    artist: "Honey Singh, Simar Kaur & Ishers",
    film: "Sonu Ke Titu Ki Sweety",
    year: 2018,
    audioUrl: "/audio/honey_singh/Dil Chori.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-gabru",
    title: "Gabru",
    artist: "Honey Singh & J-Star",
    film: "International Villager",
    year: 2011,
    audioUrl: "/audio/honey_singh/Gabru.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-get-up-jawani",
    title: "Get Up Jawani",
    artist: "Honey Singh & Badshah",
    film: "International Villager",
    year: 2011,
    audioUrl: "/audio/honey_singh/Get Up Jawani.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-glassy",
    title: "Glassy",
    artist: "Honey Singh & Ashok Mastie",
    film: "Jabariya Jodi",
    year: 2019,
    audioUrl: "/audio/honey_singh/Glassy.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-high-heels",
    title: "High Heels",
    artist: "Honey Singh & Jaz Dhami",
    film: "Ki & Ka",
    year: 2016,
    audioUrl: "/audio/honey_singh/High Heels.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-hip-hop",
    title: "Hip Hop",
    artist: "Honey Singh",
    film: "Single",
    year: 2012,
    audioUrl: "/audio/honey_singh/Hip Hop.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-khol-bottle",
    title: "Khol Bottle",
    artist: "Honey Singh",
    film: "Single",
    year: 2011,
    audioUrl: "/audio/honey_singh/Khol Bottle.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-lak-28-kudi-da",
    title: "Lak 28 Kudi Da",
    artist: "Honey Singh & Diljit Dosanjh",
    film: "Lion of Punjab",
    year: 2011,
    audioUrl: "/audio/honey_singh/Lak 28 Kudi Da.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-lungi-dance",
    title: "Lungi Dance",
    artist: "Honey Singh",
    film: "Chennai Express",
    year: 2013,
    audioUrl: "/audio/honey_singh/Lungi Dance.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-main-sharabi",
    title: "Main Sharabi",
    artist: "Honey Singh & Imran Khan",
    film: "Cocktail",
    year: 2012,
    audioUrl: "/audio/honey_singh/Main Sharabi.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-makhna",
    title: "Makhna",
    artist: "Honey Singh, Neha Kakkar & Singhsta",
    film: "Single",
    year: 2018,
    audioUrl: "/audio/honey_singh/Makhna.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-manali-trance",
    title: "Manali Trance",
    artist: "Honey Singh & Neha Kakkar",
    film: "The Shaukeens",
    year: 2014,
    audioUrl: "/audio/honey_singh/Manali Trance.mp3",
    style: "Hip Hop",
    mood: "Chill",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-one-bottle-down",
    title: "One Bottle Down",
    artist: "Honey Singh",
    film: "Single",
    year: 2015,
    audioUrl: "/audio/honey_singh/One Bottle Down.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-party-all-night",
    title: "Party All Night",
    artist: "Honey Singh",
    film: "Boss",
    year: 2013,
    audioUrl: "/audio/honey_singh/Party All Night.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-party-on-my-mind",
    title: "Party On My Mind",
    artist: "Honey Singh, KK & Shefali Alvares",
    film: "Race 2",
    year: 2013,
    audioUrl: "/audio/honey_singh/Party On My Mind.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-raat-jashan-di",
    title: "Raat Jashan Di",
    artist: "Honey Singh & Jasmine Sandlas",
    film: "Zorawar",
    year: 2016,
    audioUrl: "/audio/honey_singh/Raat Jashan Di.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-sunny-sunny",
    title: "Sunny Sunny",
    artist: "Honey Singh & Neha Kakkar",
    film: "Yaariyan",
    year: 2014,
    audioUrl: "/audio/honey_singh/Sunny Sunny.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-this-party-gettin-hot",
    title: "This Party Gettin' Hot",
    artist: "Honey Singh & Jazzy B",
    film: "Single",
    year: 2012,
    audioUrl: "/audio/honey_singh/This Party Gettin' Hot.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },
  {
    id: "honey-singh-yaar-naa-miley",
    title: "Yaar Naa Miley",
    artist: "Honey Singh & Jasmine Sandlas",
    film: "Kick",
    year: 2014,
    audioUrl: "/audio/honey_singh/Yaar Naa Miley.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/Honey Singh.png"
  },

  // --- SUMIT GOSWAMI ALL 10 SONGS ---
  {
    id: "sumit-goswami-feelings",
    title: "Feelings",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/Sumit Goswami/Feelings.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-bholenath",
    title: "Bholenath",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/Sumit Goswami/Bholenath.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-yaar-ki-shaadi",
    title: "Yaar Ki Shaadi",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/Sumit Goswami/Yaar Ki Shaadi.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-the-villagers",
    title: "The Villagers",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2021,
    audioUrl: "/audio/Sumit Goswami/The Villagers.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-tora",
    title: "Tora",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2020,
    audioUrl: "/audio/Sumit Goswami/Tora.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-bhartaar",
    title: "Bhartaar",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/Sumit Goswami/Bhartaar.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-private-jet",
    title: "Private Jet",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2021,
    audioUrl: "/audio/Sumit Goswami/Private Jet.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-army",
    title: "Army",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2021,
    audioUrl: "/audio/Sumit Goswami/Army.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-yaar-purane",
    title: "Yaar Purane",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2022,
    audioUrl: "/audio/Sumit Goswami/Yaar Purane.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  },
  {
    id: "sumit-goswami-parindey",
    title: "Parindey",
    artist: "Sumit Goswami",
    film: "Single",
    year: 2023,
    audioUrl: "/audio/Sumit Goswami/Parindey.mp3",
    style: "Hip Hop",
    mood: "Energetic",
    coverUrl: "/artists/sumit.png"
  }
];

const THEMES = [
  { id: "Auto", label: "Auto (Default)", type: "auto" },
  { id: "Leh", label: "Leh", type: "video", src: "/bg/leh.mp4" },
  { id: "Jakarta Neon", label: "Jakarta Neon", type: "video", src: "/bg/jakarta.mp4" },
  { id: "Himalayas", label: "Himalayas", type: "video", src: "/bg/himalayas.mp4" },
  { id: "Mumbai Coastal", label: "Mumbai Coastal", type: "video", src: "/bg/mumbai_coastal_road.mp4" },
  { id: "Iceland", label: "Iceland", type: "video", src: "/bg/iceland.mp4" }
];

export default function Home() {
  const [selectedArtist, setSelectedArtist] = useState<string>("All");
  const [selectedMood, setSelectedMood] = useState<string>("All");
  const [selectedStyle, setSelectedStyle] = useState<string>("All");
  const [selectedTheme, setSelectedTheme] = useState<string>("Auto");
  const [selectedCarBike, setSelectedCarBike] = useState<string>("Default Sunset");

  // Playback Auto-Trigger States
  const [activeTrackId, setActiveTrackId] = useState<string | undefined>(undefined);
  const [autoPlaySignal, setAutoPlaySignal] = useState<number>(0);

  // Navigation Dropdown State
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [showAbout, setShowAbout] = useState<boolean>(false);
  const [showProfilePhotoZoom, setShowProfilePhotoZoom] = useState<boolean>(false);

  // Background Crossfade & Video Template States
  const [bgImage, setBgImage] = useState<string>("/artists/artistBgg.png");
  const [prevBgImage, setPrevBgImage] = useState<string>("/artists/artistBgg.png");
  const [isCrossfading, setIsCrossfading] = useState<boolean>(false);
  const [isVideoBg, setIsVideoBg] = useState<boolean>(true);
  const [videoSrc, setVideoSrc] = useState<string>("/bg/leh.mp4");
  const [bgToggleIndex, setBgToggleIndex] = useState<number>(0);

  // Search & Online Ad-Free Music States (ListenFree API source)
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Track[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [showSearchResults, setShowSearchResults] = useState<boolean>(false);
  const [customOnlineTracks, setCustomOnlineTracks] = useState<Track[]>([]);

  // Debounced search effect
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (res.ok) {
          const data = await res.json();
          setSearchResults(data.results || []);
        }
      } catch (e) {
        console.error("Search API error:", e);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleSelectSearchedTrack = (track: Track) => {
    setCustomOnlineTracks((prev) => {
      if (prev.some((t) => t.id === track.id)) return prev;
      return [track, ...prev];
    });

    setSelectedArtist("All");
    setSelectedStyle("All");
    setActiveTrackId(track.id);
    setAutoPlaySignal(Date.now());
    setShowSearchResults(false);
    setSearchQuery("");
  };

  // Sync background changes based on user requirements or explicit Theme selection
  useEffect(() => {
    let nextBg = "";
    let useVideo = false;
    let currentVideo = "/bg/leh.mp4";

    if (selectedTheme !== "Auto") {
      const themeObj = THEMES.find((t) => t.id === selectedTheme);
      if (themeObj) {
        if (themeObj.type === "video" && themeObj.src) {
          useVideo = true;
          currentVideo = themeObj.src;
        } else if (themeObj.type === "image" && themeObj.src) {
          useVideo = false;
          nextBg = themeObj.src;
        }
      }
    } else if (selectedArtist !== "All") {
      // Single unified background image artistBgg.png for entire Artist section
      useVideo = false;
      nextBg = "/artists/artistBgg.png";
    } else {
      // Default Leh video as background for all standard/Auto modes
      useVideo = true;
      currentVideo = "/bg/leh.mp4";
    }

    setIsVideoBg(useVideo);

    if (useVideo) {
      setVideoSrc(currentVideo);
    } else if (nextBg && nextBg !== bgImage) {
      setPrevBgImage(bgImage || "/artists/artistBgg.png");
      setBgImage(nextBg);
      setIsCrossfading(true);
      const timer = setTimeout(() => {
        setIsCrossfading(false);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [selectedArtist, selectedStyle, selectedTheme, bgToggleIndex, bgImage]);

  // Combine local tracks and searched online ad-free tracks
  const allActiveTracks = useMemo(() => [...customOnlineTracks, ...TRACKS], [customOnlineTracks]);

  // Filter tracks based on active navigation filters
  const filteredTracks = useMemo(() => {
    return allActiveTracks.filter((track) => {
      if (track.id === activeTrackId) return true;

      const artistMatch =
        selectedArtist === "All" ||
        track.artist.toLowerCase().includes(selectedArtist.toLowerCase()) ||
        (selectedArtist.toLowerCase().includes("sidhu") && track.artist.toLowerCase().includes("sidhu"));
      const moodMatch = selectedMood === "All" || track.mood === selectedMood;
      const styleMatch = selectedStyle === "All" || track.style === selectedStyle;

      return artistMatch && moodMatch && styleMatch;
    });
  }, [allActiveTracks, activeTrackId, selectedArtist, selectedMood, selectedStyle]);

  const handleMenuToggle = (menu: string) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };

  // Click artist handler -> Filters catalog AND plays local mp3 song immediately
  const handleSelectArtist = (artistName: string, specificTrackId?: string) => {
    setSelectedArtist(artistName);
    // Reset style filter to "All" when selecting an artist to avoid empty catalog
    setSelectedStyle("All");

    let targetTrack: Track | undefined;
    if (specificTrackId) {
      targetTrack = TRACKS.find((t) => t.id === specificTrackId);
    } else if (artistName !== "All") {
      targetTrack = TRACKS.find((t) =>
        t.artist.toLowerCase().includes(artistName.toLowerCase()) ||
        (artistName.toLowerCase().includes("sidhu") && t.artist.toLowerCase().includes("sidhu"))
      );
    } else {
      targetTrack = TRACKS[0];
    }

    if (targetTrack) {
      setActiveTrackId(targetTrack.id);
      setAutoPlaySignal(Date.now());
    }

    setActiveMenu(null);
  };

  const selectFilter = (type: string, value: string) => {
    if (type === "artist") {
      handleSelectArtist(value);
      return;
    }
    if (type === "mood") setSelectedMood(value);
    if (type === "style") {
      setSelectedStyle(value);
      // Reset artist filter to "All" when selecting style so catalog is not empty
      setSelectedArtist("All");
      setBgToggleIndex((prev) => prev + 1);

      // Trigger playback for target style track immediately
      let targetTrack: Track | undefined;
      if (value === "Festivals Of Freedom") {
        targetTrack = TRACKS.find((t) => t.id === "teri-mitti-kesari");
      } else if (value === "Romantic") {
        targetTrack = TRACKS.find((t) => t.id === "style-romantic-emraan-hashmi");
      } else if (value === "Hip Hop") {
        targetTrack = TRACKS.find((t) => t.id === "hip-hop-legendary");
      } else if (value === "South Music") {
        targetTrack = TRACKS.find((t) => t.id === "south-indian-hits");
      } else if (value === "Road Trip") {
        targetTrack = TRACKS.find((t) => t.id === "road-trip-hits");
      } else if (value === "Late Night Drive") {
        targetTrack = TRACKS.find((t) => t.id === "late-night-drive");
      } else if (value === "Retro") {
        targetTrack = TRACKS.find((t) => t.id === "retro-vintage-souls");
      } else if (value !== "All") {
        targetTrack = TRACKS.find((t) => t.style === value);
      } else {
        targetTrack = TRACKS[0];
      }

      if (targetTrack) {
        setActiveTrackId(targetTrack.id);
        setAutoPlaySignal(Date.now());
      }
    }
    setActiveMenu(null);
  };

  // Quick reset all filters
  const resetFilters = () => {
    setSelectedArtist("All");
    setSelectedMood("All");
    setSelectedStyle("All");
    setActiveTrackId(undefined);
  };

  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-between overflow-hidden">
      
      {/* 1. Dynamic Crossfading Background Layers & Video Layer */}
      <div className="fixed inset-0 z-[-20] bg-[#0d0f17] overflow-hidden">
        {isVideoBg ? (
          <div className="absolute inset-0 w-full h-full">
            <video
              key={videoSrc}
              src={videoSrc}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-105 filter brightness-75 contrast-110"
            />
          </div>
        ) : (
          <>
            {/* Previous background fade-out layer */}
            <div
              className="bg-transition-layer"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(13, 15, 23, 0.35), rgba(23, 18, 30, 0.85)), url('${prevBgImage}')`,
                opacity: isCrossfading ? 1 : 0,
                zIndex: -19,
              }}
            />
            {/* Active background fade-in layer */}
            <div
              className="bg-transition-layer"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(13, 15, 23, 0.35), rgba(23, 18, 30, 0.85)), url('${bgImage}')`,
                opacity: isCrossfading ? 0 : 1,
                zIndex: -18,
              }}
            />
          </>
        )}
        {/* Dark vignette & gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/90 z-[-15] pointer-events-none" />
      </div>

      {/* 2. Fixed grain noise overlay */}
      <div className="grain-overlay" />

      {/* Invisible backdrop to dismiss dropdowns and search suggestions */}
      {(activeMenu || showSearchResults) && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          onClick={() => {
            setActiveMenu(null);
            setShowSearchResults(false);
          }}
        />
      )}

      {/* Top Left Clock (Outside Nav Box, near screen corner) */}
      <div className="absolute top-6 md:top-7 left-6 md:left-8 z-50 pointer-events-auto">
        <Clock />
      </div>

      {/* Top Right Like Button (Outside Nav Box, near screen right corner) */}
      <div className="absolute top-6 md:top-7 right-6 md:right-8 z-50 pointer-events-auto">
        <LikeButton />
      </div>

      {/* 3. UPPER TOP OPTION BAR (iPhone Frosted Glass Floating Capsule) */}
      <header className="w-[95%] max-w-6xl mx-auto mt-16 md:mt-4 px-6 py-3.5 md:py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3.5 md:gap-0 z-50 select-none rounded-2xl md:rounded-full ios-glass-bar transition-all">
        
        {/* Left Side Navigation Options: Artist, Mood, Style, Car/Bike */}
        <nav className="order-1 flex items-center gap-6 md:gap-12">
          
          {/* Artist Filter Option */}
          <div className="relative">
            <button
              onClick={() => handleMenuToggle("artist")}
              className={`text-[15px] md:text-[17px] font-bold tracking-wide cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedArtist !== "All" ? "text-accent drop-shadow-[0_0_8px_rgba(255,107,61,0.5)]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Artist</span>
              {selectedArtist !== "All" && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent">
                  {selectedArtist}
                </span>
              )}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "artist" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {/* ARTIST DROPDOWN MENU */}
            {activeMenu === "artist" && (
              <div className="absolute left-0 mt-3 w-64 md:w-72 dropdown-menu z-50 p-2 flex flex-col gap-1.5 shadow-2xl">
                <div className="px-3 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white/40 border-b border-white/10">
                  Select Artist to Play MP3
                </div>

                {/* All Artists Option */}
                <button
                  onClick={() => handleSelectArtist("All")}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    selectedArtist === "All"
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className="font-bold text-sm tracking-tight">All Artists</span>
                  <span className="text-[10px] text-white/40">{TRACKS.length} tracks</span>
                </button>

                {/* Specific Artists with Logo Photos */}
                {ARTISTS.filter((a) => a.name !== "All").map((artist) => {
                  const artistTracks = TRACKS.filter((t) =>
                    t.artist.toLowerCase().includes(artist.name.toLowerCase()) ||
                    (artist.name === "Sidhu Moosewala" && t.artist.toLowerCase().includes("sidhu"))
                  );
                  const isSelected = selectedArtist === artist.name;

                  return (
                    <div key={artist.name} className="flex flex-col gap-0.5">
                      <button
                        onClick={() => handleSelectArtist(artist.name)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                          isSelected
                            ? "bg-accent/20 text-accent border border-accent/30 shadow-md"
                            : "text-white/85 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          {/* Artist Logo Avatar */}
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-white/20 bg-black/40 shadow-sm">
                            {artist.image ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-accent/30 flex items-center justify-center font-bold text-[10px] text-white">
                                {artist.name[0]}
                              </div>
                            )}
                          </div>
                          <span className="font-bold text-sm tracking-tight">{artist.name}</span>
                        </div>
                        
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] bg-white/10 text-white/60 px-2 py-0.5 rounded-full font-mono">
                            {artistTracks.length}
                          </span>
                          <span className="w-5 h-5 rounded-full bg-accent/80 hover:bg-accent text-white flex items-center justify-center shadow">
                            <svg className="w-2.5 h-2.5 ml-0.5 fill-current" viewBox="0 0 24 24">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </span>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>



          {/* Style Filter Option */}
          <div className="relative">
            <button
              onClick={() => handleMenuToggle("style")}
              className={`text-[15px] md:text-[17px] font-bold tracking-wide cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedStyle !== "All" ? "text-accent drop-shadow-[0_0_8px_rgba(255,107,61,0.5)]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Style</span>
              {selectedStyle !== "All" && (
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-accent/20 border border-accent/40 text-accent">
                  {selectedStyle}
                </span>
              )}
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "style" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === "style" && (
              <div className="absolute left-0 mt-3 w-56 dropdown-menu z-50 p-1.5 flex flex-col gap-1 shadow-2xl">
                {[
                  "All",
                  "Festivals Of Freedom",
                  "Late Night Drive",
                  "Road Trip",
                  "Romantic",
                  "South Music",
                  "Hip Hop",
                  "Retro"
                ].map((style) => (
                  <button
                    key={style}
                    onClick={() => selectFilter("style", style)}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      selectedStyle === style
                        ? "bg-accent/20 text-accent font-bold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            )}
          </div>

        </nav>

        {/* Middle Search Input & Autosuggestion Finder Bar */}
        <div className="order-3 md:order-2 relative w-full md:flex-1 max-w-none md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-0 md:mx-8 z-50">
          <div className="relative flex items-center w-full bg-white/10 hover:bg-white/15 border border-white/25 focus-within:border-accent/90 focus-within:bg-black/70 rounded-full px-4 py-2.5 md:py-3 transition-all shadow-lg backdrop-blur-md">
            <svg
              className="w-5 h-5 text-accent/90 mr-2.5 shrink-0 transition-transform duration-200 group-focus-within:scale-110"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(true);
              }}
              onFocus={() => setShowSearchResults(true)}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  setShowSearchResults(false);
                  (e.target as HTMLInputElement).blur();
                }
              }}
              placeholder="Search any song, title, artist..."
              className="w-full bg-transparent text-sm md:text-[15px] text-white placeholder-white/50 focus:outline-none font-semibold tracking-wide"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSearchResults([]);
                  setShowSearchResults(false);
                }}
                className="text-white/40 hover:text-white text-sm font-bold px-1.5 ml-1 cursor-pointer transition-colors"
                title="Clear search"
              >
                ✕
              </button>
            )}
          </div>

          {/* Autosuggestion Title Finder Popup Dropdown */}
          {showSearchResults && (
            <div className="absolute left-0 right-0 top-full mt-2.5 dropdown-menu z-50 p-2 md:p-2.5 flex flex-col gap-1 max-h-80 md:max-h-96 overflow-y-auto shadow-2xl border border-white/20 rounded-2xl bg-[#0f1118]/95 backdrop-blur-2xl">
              {searchQuery.trim().length > 0 ? (
                <>
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-accent flex items-center justify-between border-b border-white/10 mb-1">
                    <span>Matches for "{searchQuery.trim()}"</span>
                    {isSearching && <span className="animate-pulse text-white/60">Searching Online...</span>}
                  </div>

                  {/* Local Catalog Matches */}
                  {TRACKS.filter(
                    (t) =>
                      t.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                      t.artist.toLowerCase().includes(searchQuery.trim().toLowerCase())
                  )
                    .slice(0, 8)
                    .map((track) => (
                      <button
                        key={`local-search-${track.id}`}
                        onClick={() => handleSelectSearchedTrack(track)}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-black/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={track.coverUrl || "/about.png"} alt={track.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-bold text-white truncate group-hover:text-accent transition-colors">
                            {track.title}
                          </span>
                          <span className="text-[10px] text-white/60 truncate">{track.artist}</span>
                        </div>
                        <span className="text-[9px] uppercase font-bold text-accent px-2.5 py-0.5 rounded-full bg-accent/20 border border-accent/30 group-hover:bg-accent group-hover:text-white transition-all">
                          Play
                        </span>
                      </button>
                    ))}

                  {/* Online Ad-Free Matches (ListenFree API source) */}
                  {searchResults.map((track) => (
                    <button
                      key={track.id}
                      onClick={() => handleSelectSearchedTrack(track)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-left hover:bg-white/10 transition-colors cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-white/20 bg-black/40">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={track.coverUrl || "/about.png"} alt={track.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="text-xs font-bold text-white truncate group-hover:text-emerald-400 transition-colors">
                          {track.title}
                        </span>
                        <span className="text-[10px] text-white/60 truncate">{track.artist} • {track.film}</span>
                      </div>
                      <span className="text-[9px] uppercase font-bold text-emerald-400 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        Ad-Free
                      </span>
                    </button>
                  ))}

                  {!isSearching &&
                    searchResults.length === 0 &&
                    TRACKS.filter(
                      (t) =>
                        t.title.toLowerCase().includes(searchQuery.trim().toLowerCase()) ||
                        t.artist.toLowerCase().includes(searchQuery.trim().toLowerCase())
                    ).length === 0 && (
                      <div className="px-3 py-5 text-center text-xs text-white/50">
                        No songs found for "{searchQuery.trim()}". Try another song or artist name.
                      </div>
                    )}
                </>
              ) : (
                /* Quick Suggestions / Popular Recommendations when search input is empty but focused */
                <div className="flex flex-col gap-2 p-1.5">
                  <div className="px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider text-white/40 border-b border-white/10 flex items-center justify-between">
                    <span>Quick Suggestions & Trending</span>
                    <span className="text-[9px] text-accent/80 font-sans normal-case">Type to search</span>
                  </div>

                  {/* Trending Artist Quick Chips */}
                  <div className="flex flex-wrap gap-1.5 px-1 py-1">
                    {["Sidhu Moosewala", "Karan Aujla", "Diljit Dosanjh", "Honey Singh", "Sumit Goswami", "Shubh", "Cheema Y", "Romantic", "Late Night Drive"].map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          setSearchQuery(tag);
                          setShowSearchResults(true);
                        }}
                        className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-accent/20 hover:text-accent border border-white/15 hover:border-accent/40 text-white/80 transition-all cursor-pointer"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>

                  {/* Top Popular Tracks */}
                  <div className="flex flex-col gap-0.5 mt-1">
                    <div className="px-2 py-0.5 text-[9px] font-mono uppercase tracking-wider text-white/30">
                      Popular Songs
                    </div>
                    {TRACKS.slice(0, 5).map((track) => (
                      <button
                        key={`quick-popular-${track.id}`}
                        onClick={() => handleSelectSearchedTrack(track)}
                        className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-xl text-left hover:bg-white/10 transition-colors cursor-pointer group"
                      >
                        <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-white/15 bg-black/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={track.coverUrl || "/about.png"} alt={track.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex flex-col min-w-0 flex-1">
                          <span className="text-xs font-semibold text-white truncate group-hover:text-accent transition-colors">
                            {track.title}
                          </span>
                          <span className="text-[10px] text-white/50 truncate">{track.artist}</span>
                        </div>
                        <span className="text-[9px] font-bold text-accent/80 group-hover:text-accent px-2 py-0.5 rounded-full bg-white/5">
                          Play
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Theme & About / Developer Profile Buttons */}
        <div className="order-2 md:order-3 flex items-center gap-6 z-50">
          {/* Theme Option (Change background video according to mood) */}
          <div className="relative">
            <button
              onClick={() => handleMenuToggle("theme")}
              className={`text-[15px] md:text-[17px] font-bold tracking-wide cursor-pointer transition-all flex items-center gap-1.5 ${
                selectedTheme !== "Auto" ? "text-accent drop-shadow-[0_0_8px_rgba(255,107,61,0.5)]" : "text-white/90 hover:text-white"
              }`}
            >
              <span>Theme</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${activeMenu === "theme" ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {activeMenu === "theme" && (
              <div className="absolute right-0 mt-3 w-64 dropdown-menu z-50 p-1.5 flex flex-col gap-1 shadow-2xl">
                {THEMES.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => {
                      setSelectedTheme(theme.id);
                      setActiveMenu(null);
                    }}
                    className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-medium cursor-pointer transition-colors ${
                      selectedTheme === theme.id
                        ? "bg-accent/20 text-accent font-bold"
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {theme.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAbout(true)}
            className="group relative flex flex-col items-center justify-center cursor-pointer transition-transform active:scale-95"
            title="Developer Profile"
          >
            <div className="w-10 h-10 md:w-11 md:h-11 rounded-full border-2 border-emerald-500/70 group-hover:border-emerald-400 bg-black/40 overflow-hidden shadow-lg shadow-emerald-950/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/about.png" alt="Soham Bhaskar Gunjal" className="w-full h-full object-cover scale-105" />
            </div>
            <span className="text-[10px] md:text-[11px] font-bold tracking-wider text-emerald-400 group-hover:text-white uppercase mt-0.5">
              About
            </span>
          </button>
        </div>
      </header>



      {/* Centerpiece Container */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6 mt-12 md:mt-20 pointer-events-none select-none">
        <h1 className="text-white/20 text-4xl sm:text-6xl font-black tracking-widest uppercase select-none opacity-30 mix-blend-overlay">
          SoSon Music
        </h1>
        <span className="text-white/15 text-[21px] font-medium tracking-[0.3em] uppercase select-none mt-2.5 opacity-25 mix-blend-overlay">
          By Soham Gunjal
        </span>
      </div>

      {/* 4. Horizontal Media Player Container (Bottom of Page) */}
      <div className="w-full max-w-5xl px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] mb-4 z-40">
        {filteredTracks.length > 0 ? (
          <MusicPlayer
            tracks={filteredTracks}
            activeTrackId={activeTrackId}
            autoPlaySignal={autoPlaySignal}
            selectedArtist={selectedArtist}
          />
        ) : (
          <div className="w-full rounded-2xl glass-panel p-6 flex flex-col items-center justify-center text-center gap-3">
            <span className="text-white/70 text-sm font-semibold">No tracks match your current active filters.</span>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-full bg-accent/20 hover:bg-accent/30 text-accent hover:text-white border border-accent/30 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-md"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* About Modal - Developer Profile */}
      {showAbout && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-lg animate-fadeIn">
          <div className="w-full max-w-md rounded-3xl bg-[#0e1015] border border-emerald-500/40 p-6 md:p-7 relative shadow-[0_0_50px_rgba(16,185,129,0.25)] text-white">
            
            {/* Header Bar */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2 text-emerald-400 text-[11px] md:text-xs font-mono font-bold tracking-widest uppercase">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                </svg>
                <span>DEVELOPER PROFILE</span>
              </div>

              <button
                onClick={() => setShowAbout(false)}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors cursor-pointer flex items-center justify-center border border-white/10"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Avatar & Title */}
            <div className="flex flex-col items-center text-center mb-5">
              <button
                onClick={() => setShowProfilePhotoZoom(true)}
                className="group relative w-24 h-24 rounded-full overflow-hidden border-2 border-emerald-500 hover:border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.45)] mb-3 bg-black/40 cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95"
                title="Click to view full photo"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about.png" alt="Soham Bhaskar Gunjal" className="w-full h-full object-cover scale-105 transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] font-bold font-mono text-emerald-300">
                  <svg className="w-5 h-5 mb-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                  </svg>
                  <span>View</span>
                </div>
              </button>

              <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-1">
                Soham Bhaskar Gunjal
              </h3>

              <div className="text-[10px] md:text-[11px] font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center justify-center gap-1.5">
                <span>💼</span>
                <span>SOFTWARE DEVELOPER & CREATIVE DEVELOPER</span>
              </div>
            </div>

            <div className="w-full h-[1px] bg-white/10 mb-4" />

            {/* Tribute Highlight */}
            <div className="mb-4 flex items-center justify-center">
              <div className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs md:text-sm tracking-wide shadow-[0_0_15px_rgba(245,158,11,0.2)] flex items-center gap-2">
                <span>🕊️</span>
                <span>R.I.P Legend Sidhu Moosewala</span>
              </div>
            </div>

            {/* Biography */}
            <div className="mb-5">
              <div className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase mb-1.5">
                BIOGRAPHY
              </div>
              <p className="text-xs md:text-sm text-white/85 leading-relaxed font-sans font-normal">
                Aspiring Software Developer passionate about building innovative, practical solutions. Focused on full-stack development, AI, and solving real-world problems through technology. Always learning, building, and turning ideas into impactful digital products.
              </p>
            </div>

            {/* Connect & Links */}
            <div>
              <div className="text-[10px] font-mono font-bold tracking-widest text-white/40 uppercase mb-3">
                CONNECT & LINKS
              </div>

              {/* Grid 2 Columns */}
              <div className="grid grid-cols-2 gap-2.5 mb-2.5">
                {/* LinkedIn */}
                <a
                  href="https://www.linkedin.com/in/soham-gunjal-a49b75324/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 text-[#0a66c2] fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                  <span className="font-semibold">LinkedIn</span>
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com/SohamBhaskarGunjal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer group"
                >
                  <svg className="w-4 h-4 text-white fill-current" viewBox="0 0 24 24">
                    <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
                  </svg>
                  <span className="font-semibold">GitHub</span>
                </a>
              </div>

              {/* Instagram Full Width */}
              <a
                href="https://www.instagram.com/_soham_0008_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-white/90 hover:text-white transition-all cursor-pointer mb-2.5 group"
              >
                <svg className="w-4 h-4 text-[#e4405f] fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span className="font-semibold">Instagram</span>
              </a>

              {/* Portfolio Website */}
              <a
                href="https://github.com/SohamBhaskarGunjal"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white/5 hover:bg-emerald-500/20 border border-emerald-500/40 text-xs font-mono font-bold text-emerald-400 hover:text-emerald-300 transition-all cursor-pointer shadow-[0_0_15px_rgba(16,185,129,0.15)]"
              >
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0a15.3 15.3 0 0 1-4-9 15.3 15.3 0 0 1 4-9 15.3 15.3 0 0 1 4 9 15.3 15.3 0 0 1-4 9Zm-9-9h18" />
                </svg>
                <span>Portfolio Website</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Profile Photo Lightbox Modal (WhatsApp / Instagram Style) */}
      {showProfilePhotoZoom && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-between p-4 md:p-8 bg-black/95 backdrop-blur-2xl animate-fadeIn select-none"
          onClick={() => setShowProfilePhotoZoom(false)}
        >
          {/* Top Bar with Name & Close Button */}
          <div className="w-full max-w-4xl flex items-center justify-between z-10 pt-2 px-2" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-emerald-500/60 overflow-hidden bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about.png" alt="Soham Bhaskar Gunjal" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm md:text-base font-bold text-white tracking-wide">Soham Bhaskar Gunjal</span>
                <span className="text-[11px] font-mono text-emerald-400">Profile Photo</span>
              </div>
            </div>

            <button
              onClick={() => setShowProfilePhotoZoom(false)}
              className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer flex items-center justify-center border border-white/20 shadow-lg active:scale-90"
              title="Close viewer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Central High-Res Circular Photo Container (WhatsApp / Instagram Style Circle) */}
          <div className="my-auto relative flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-emerald-500/90 shadow-[0_0_100px_rgba(16,185,129,0.45)] bg-black animate-scaleUp p-1">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/about.png"
                alt="Soham Bhaskar Gunjal Profile Picture"
                className="w-full h-full object-cover rounded-full shadow-2xl"
              />
            </div>
          </div>

          {/* Bottom Hint Bar */}
          <div className="z-10 pb-2 text-[11px] font-mono font-medium text-white/50 tracking-wider uppercase">
            Click anywhere to exit viewer
          </div>
        </div>
      )}
    </main>
  );
}

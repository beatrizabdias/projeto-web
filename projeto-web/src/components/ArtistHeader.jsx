import React from 'react';
import { Play } from 'lucide-react'; 

export default function ArtistHeader({ artist = {} }) {
    const { name, about, image } = artist;
    const monthlyListeners = (Math.random() * 10 + 1).toFixed(1); 

    return (
        <>
            <div className="artist-header flex">
                <div className="artist-info flex">
                    <h1 className="name-artist">{name}</h1>
                    <p className="artist-description">
                        {about} 
                        <a href="#"><strong>Ver mais</strong></a>
                    </p>
                    <span>10 ouvintes mensais</span>
                </div>
        <header className="relative p-6 pt-40 bg-gradient-to-t from-zinc-900 to-red-900 rounded-lg -mx-6 -mt-6 mb-8">
            
            <div className="absolute inset-0 z-0 opacity-40">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover"
                />
            </div>
            
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent"></div>
            
            <div className="relative z-10 flex flex-col justify-end h-full text-white">
                
                <span className="text-sm font-semibold">Artista Verificado</span>
                
                <h1 className="text-8xl font-black mt-4 drop-shadow-xl leading-tight">
                    {name}
                </h1>
                
                <p className="text-sm font-semibold mt-4">
                    {monthlyListeners}M ouvintes mensais
                </p>


            </div>

            <div className="flex items-center gap-4 mt-6 relative z-10">
                
                <button className="w-14 h-14 flex items-center justify-center p-2 rounded-full bg-green-500 text-black hover:scale-105 transition-transform">
                    <Play fill="black" className="w-7 h-7 ml-[2px]" />
                </button>
                
                <button className="text-sm font-bold text-white border border-white px-5 py-2 rounded-full hover:bg-white hover:text-zinc-900 transition-colors">
                    Seguir
                </button>
            </div>
        </header>
        </div> 
        </>
    );
}
import { DefaultUi, Player, Youtube } from "@vime/react";
import { CaretRight, DiscordLogo, FileArrowDown, Image, LightningSlash } from "phosphor-react";

import '@vime/core/themes/default.css';
import { useGetLessonBySlugQuery } from "../graphql/generated";

interface VideoProps {
  lessonSlug: string;
}

export function Video({ lessonSlug }: VideoProps) {
  const { data } = useGetLessonBySlugQuery( {
    variables: {
      slug: lessonSlug
    }
  });

  if(!data || !data.lesson) {
    return(
      <div className="flex-1 flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return(
    <div className="flex-1">
      <div className="flex justify-center bg-black">
        <div className="h-full w-full max-w-[1100px] max-h-[60vh] aspect-video">
          <Player>
            <Youtube videoId={data.lesson.videoId}/>
            <DefaultUi />
          </Player>
        </div>
      </div>

      <div className="p-8 max-w-[1100px] mx-auto">
        <div className="flex items-start gap-16"> 
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>
            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
                <img
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="Teacher avatar" 
                />

                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                  <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
            
          </div>
          <div className="flex flex-col gap-4">
            <a 
              href="#" 
              className="p-4 text-sm bg-green-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors"
            >
              <DiscordLogo size={24}/>
              Discord Server
            </a>
            <a 
              href="#" 
              className="p-4 text-sm text-blue-500 border border-blue-500 flex items-center rounded font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors"
            >
              <LightningSlash size={24}/>
              Access challenge
            </a>
          </div>
        </div>
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={40}/>
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Complementary material</strong>
              <p className="text-sm text-gray-200 mt-2">
                Access the complementary material to accelerate your growth
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24}/>
            </div>
          </a>
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <Image size={40}/>
            </div>
            <div className="py-6 leading-relaxed">
              <strong className="text-2xl">Exclusive wallpapers</strong>
              <p className="text-sm text-gray-200 mt-2">
                Download exclusive wallpapers from Ignite Lab and customize your machine
              </p>
            </div>
            <div className="h-full p-6 flex items-center">
              <CaretRight size={24}/>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
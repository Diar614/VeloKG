import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";

const DescriptionSection = () => {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <>
      <motion.div
        ref={sectionRef}
        initial={{ opacity: 0, y: 50 }}
        animate={sectionInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20 px-[20%]"
      >
        <div>
          <h1 className="text-6xl mb-6">
            Что такое катание на горных велосипедах эндуро?
          </h1>
          <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5 pr-24">
            Эндуро-катание на горных велосипедах уходит корнями в гонки на
            эндуро. В гонках на эндуро гонщики соревнуются на определённых
            участках (обычно на спусках), но между ними они должны перемещаться.
            Таким образом, эндуро-катание на горных велосипедах в некоторых
            аспектах похоже на катание на скоростных спусках. Велосипеды
            сконструированы так, чтобы обеспечить невероятный уровень мастерства
            при спуске. Однако эндуро-велосипеды отличаются от скоростных или
            
            <Link
              to="/freerideBike"
              className="underline pl-2 cursor-pointer hover:text-blue-700 pr-2"
            >
              фрирайд-велосипедах  
            </Link>
             тем, что они немного более универсальны. Они
            очень хорошо взбираются на холмы, несмотря на свою массивность, в то
            время как велосипед для скоростного спуска практически бесполезен,
            если только он не едет, ну, вниз по склону.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="flex items-center justify-center text-center py-20 px-[20%]"
      >
        <div>
          <h1 className="text-6xl mb-6">
            Почему я должен выбрать горный велосипед Enduro, а не трейловый?
          </h1>
          <p className="text-xl sm:text-lg md:text-xl leading-relaxed max-w-4xl mx-auto pt-5">
            Если вам действительно не терпится как можно быстрее промчаться по
            крутым, труднопроходимым тропам, купите велосипед для эндуро. Вы
            по-прежнему сможете погонять с друзьями на трейл-байках в течение
            дня, но вы будете в восторге от спусков и труднопроходимых участков
            тропы. Конечно, на подъёмах вам придётся немного тяжелее, так что
            если для вас важны мастерство в подъёмах и сохранение темпа на
            равнинных участках, то выбирайте трейл-байк. Но если вам нравится
            спускаться с горы как можно быстрее (и иногда кататься в парке),
            выбирайте эндуро.
            
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default DescriptionSection;

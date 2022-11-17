import { useCallback, useEffect, useState } from 'react';
import { whoIAmArr } from '../../assets/locale.english';
import useDidMountEffect from '../../helpers/useDidMountEffect';
import wait from '../../helpers/wait';
import { WhoIAm } from '../../types/types';

const AboutMe = () => {
    const [whoIAmIndex, setWhoIAmIndex] = useState(0);
    const [iAm, setIAm] = useState("");
    const [desc, setDesc] = useState<string>();
    const [showDesc, setShowDesc] = useState(false);

    useDidMountEffect(() => {
        const descString = whoIAmArr[whoIAmIndex].desc;
        setDesc(descString);

        const timerBase = 300;
        const iAmString = whoIAmArr[whoIAmIndex].iAm;

        const typingEffectAsync = async () => {
            const prepare = async () => {
                    for(let i=iAm.length+1; i >= 0; i--) {
                        const newString = iAm.substring(0, i);
                        setIAm(newString);
                        await wait(100);
                    }
                    await wait(timerBase);
            }
            if (iAm.length > 0) await prepare();
            for(let i=0; i < iAmString.length+1; i++) {
                const newString = iAmString.substring(0, i);
                setIAm(newString);
                await wait(timerBase);
            }
        }

        typingEffectAsync()
            .then(() => setTimeout(() => setShowDesc(true), timerBase))
            .then(() => setTimeout(() => {
                setShowDesc(false);
                const newIndex = whoIAmIndex+1;
                if (newIndex < whoIAmArr.length) setWhoIAmIndex(newIndex);
                else setWhoIAmIndex(0);
            }, 2000));
    }, [whoIAmIndex]);

    return (
        <div className="text-white">
            <div className="text-4xl font-bold">I'm <span className="underline">{iAm}</span><span className="animate-blink">|</span></div>
            <div className={`transition-all duration-500 ${showDesc ? "opacity-100 mt-3" : "leading-[0] opacity-0"}`}>{desc}</div>
        </div>
    )
}

export default AboutMe;
import defaultImg from '@/assets/img/defaultImage.png';
import defaultWideImg from '@/assets/img/wideDefaultImg.png';

export const changeDefaultImage = (ev: any, isDefaultImg: boolean) => {
    ev.target.src = isDefaultImg ? defaultImg : defaultWideImg;
};

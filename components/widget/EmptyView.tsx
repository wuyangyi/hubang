import { NextPage } from "next";
import styles from '../../styles/components/widget/empty_view.module.scss';
const staticPath = process.env.STATIC_HOST;


const EmptyView: NextPage<{ type?: number }> = (
    {
        type = 0,
    }
) => {
    function getErrorImg() {
        let img = "";
        if (type == 0) { //无内容
            img = `${staticPath}/images/ico_empty.png`
        }
        return img;
    }

    return <div className={styles.empty_content}>
        <img className={styles.image} src={getErrorImg()} width="50%" alt="" />
    </div>;
}

export default EmptyView;
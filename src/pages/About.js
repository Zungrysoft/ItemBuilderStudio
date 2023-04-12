function AboutPage({ data, onChange }) {
    return (
        <div>
            <p>
                ItemBuilder is a datapack that allows Minecraft Java Edition mapmakers
                to create custom items using a system of effects and conditions. This website
                makes it easy to generate the give commands for those items. This site is mainly
                geared toward Complete-The-Monument mapmakers, but survival and adventure
                mapmakers will likely find this useful as well.
            </p>
            <a href="https://github.com/Zungrysoft/ItemBuilder/releases" target="_blank">Get the datapack here</a>
            <div/>
            <a href="https://www.youtube.com/watch?v=F3cVSwe-9Ys&list=PLIKyq4udOqV5j7yCZHKlt72CUPi7CpuRK" target="_blank">Video Tutorial</a>
            <div/>
            <a href={`${process.env.PUBLIC_URL}/files/UserDefined.zip`} download target="_blank">User-Defined Example</a>
            <p>Created by ZungryWare</p>
            <p>Contact: ZungrySoftEntertainment@gmail.com or ZungryWare#1545 on Discord</p>
        </div>
    );
}

export default AboutPage;

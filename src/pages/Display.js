function DisplayPage({ data, onChange }) {
    return (
        <div>
            <p className="label">Name: </p>
            <input
                className="input-box"
                type="text"
                defaultValue={data.name}
                onChange={(e) => {
                    onChange({
                        ...data,
                        name: e.target.value,
                    })
                }}
            />
            <p className="label">Lore: </p>
            <input
                className="input-box"
                type="text"
                defaultValue={data.lore}
                onChange={(e) => {
                    onChange({
                        ...data,
                        lore: e.target.value,
                    })
                }}
            />
            <p className="label">Leather Color: </p>
            <input
                className="input-box"
                type="color"
                defaultValue={data.color}
                onChange={(e) => {
                    onChange({
                        ...data,
                        color: e.target.value,
                    })
                }}
            />
        </div>
    );
}

export default DisplayPage;

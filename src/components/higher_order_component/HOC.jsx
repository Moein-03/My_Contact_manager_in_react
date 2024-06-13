let HOC = wrappedComponent => {
    const colors = [
        'dark',
        'primary',
        'success',
        'info'
    ];

    const randomColors = colors[Math.floor(Math.random() * colors.length)];

    let ClassName = `bg-${randomColors}`;

    return props => {
        return (
            <div className={ClassName}>
                <wrappedComponent {...props}/>
            </div>
        )
    }
}

export default HOC
function StatusMenu(props) {
    const { statusIndex, removeStatus } = props;

    return (<>
        <div className="status-menu hidden" id={`status-${statusIndex}`}>
            <button className="delete-status critical" onClick={() => {
                document.getElementById(`status-${statusIndex}`).classList.toggle("hidden");
                removeStatus(statusIndex);
            }}>Delete Status</button>
        </div>
    </>)
}

export default StatusMenu;
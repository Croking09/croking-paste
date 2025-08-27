function CopyButton({ displayText, copyText }) {
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(copyText);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button className="glass px-2" onClick={() => copyToClipboard()}>
      {displayText}
    </button>
  );
}

export default CopyButton;

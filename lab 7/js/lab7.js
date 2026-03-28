const init = () => {
    //...Not sure I did this right.
    const UNORDERED_LISTS = Array.from(document.querySelectorAll("li"));
    const MORE_NODES = [["Advanced Java Programming"], ["Fundamentals of C Programming"]];
    TEXT_CONTENTS = UNORDERED_LISTS.map(textGetter);
    const FULL_LIST = [...TEXT_CONTENTS, ...MORE_NODES];
    console.log(FULL_LIST);
}

const textGetter = (node) => {
    return [node.textContent];
}

window.onload = init
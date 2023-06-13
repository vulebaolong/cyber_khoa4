export const loading = {
    show: () => {
        document.querySelector(".loading").classList.remove("hide");
        document.querySelector(".loading").classList.add("show");
    },
    hide: () => {
        document.querySelector(".loading").classList.remove("show");
        document.querySelector(".loading").classList.add("hide");
    },
};

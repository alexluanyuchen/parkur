
async function searchMusic() {
    const keyword = document.getElementById("keyword").value.trim();
    const results = document.getElementById("results");
    const status = document.getElementById("status");

    if (!keyword) {
        status.innerText = "请输入歌曲名称或歌手";
        return;
    }

    results.innerHTML = "";
    status.innerText = "正在搜索...";

    try {
        const url = "https://itunes.apple.com/search?term="
            + encodeURIComponent(keyword)
            + "&entity=song&limit=30";

        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("网络请求失败");
        }

        const data = await response.json();

        if (data.resultCount === 0) {
            status.innerText = "没有找到相关音乐";
            return;
        }

        status.innerText = "找到 " + data.resultCount + " 首歌曲";

        data.results.forEach(song => {
            const item = document.createElement("div");

            const cover = document.createElement("img");
            cover.src = song.artworkUrl100;
            cover.alt = "专辑封面";

            const title = document.createElement("h3");
            title.textContent = song.trackName;

            const artist = document.createElement("p");
            artist.textContent = "歌手：" + song.artistName;

            const album = document.createElement("p");
            album.textContent = "专辑：" + song.collectionName;

            const link = document.createElement("a");
            link.href = song.trackViewUrl;
            link.target = "_blank";
            link.rel = "noopener";
            link.textContent = "打开 Apple Music";

            item.append(
                cover,
                title,
                artist,
                album,
                link
            );

            if (song.previewUrl) {
                const audio = document.createElement("audio");
                audio.controls = true;
                audio.preload = "none";
                audio.src = song.previewUrl;
                item.appendChild(document.createElement("br"));
                item.appendChild(audio);
            }

            item.appendChild(document.createElement("hr"));
            results.appendChild(item);
        });

    } catch (error) {
        status.innerText = "搜索失败：" + error.message;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("keyword");

    input.addEventListener("keydown", event => {
        if (event.key === "Enter") {
            searchMusic();
        }
    });
});

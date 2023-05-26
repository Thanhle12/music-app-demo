const image = document.getElementById('cover'),
title = document.getElementById('music-title'),
artist = document.getElementById('music-artist'),
currentTimeEl = document.getElementById('current-time'),
durationEl = document.getElementById('duration'),
progress = document.getElementById('progress'),
playerProgress = document.getElementById('player-progress'),
prevBtn = document.getElementById('prev'),
nextBtn = document.getElementById('next'),
playBtn = document.getElementById('play'),
background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Making-My-Way-Son-Tung-M-TP.mp3',
        displayName: 'Making My Way',
        cover: 'assets/artworks-vVV3zxIIBvCfCLMH-4RQl1w-t500x500.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/wake-me-up-lum-x-tribute-remix.mp3',
        displayName: 'Wake Me Up',
        cover: 'assets/wake me up.jpg',
        artist: 'Avicii',
    },
    {
        path: 'assets/pham-lich-cover-and-nguyen-hoang-ft-hai-nam-remix-exclusive-music.mp3',
        displayName: 'Là Anh (Hải Nam Remix)',
        cover: 'assets/la_anh.jpg',
        artist: 'Phạm Lịch',
    },
    {
        path: 'assets/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3',
        displayName: 'Chúng Ta Không Thuộc Về Nhau',
        cover: 'assets/1503305440699_640.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/LacTroiTripleDRemix-SonTungMTP-5164670.mp3',
        displayName: 'Lạc Trôi (Triple D Remix)',
        cover: 'assets/Lac_troi_single_sontungmtp.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/Chay Ngay Di - Son Tung M-TP - NhacHay360.mp3',
        displayName: 'Chạy Ngay Đi',
        cover: 'assets/Chay_ngay_di.png',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/tp-co-chac-yeu-la-day-official-music-video.mp3',
        displayName: 'Có Chắc Yêu Là Đây',
        cover: 'assets/Sơn_Tùng_M-TP_-_Có_chắc_yêu_là_đây.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/ChacAiDoSeVe-SonTungMTP-3597661.mp3',
        displayName: 'Chắc Ai Đó Sẽ Về (OST Chàng Trai Năm ẤY)',
        cover: 'assets/chac_ai_do_se_ve.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/NoiNayCoAnhMasewRemix-SonTungMTP-4816830.mp3',
        displayName: 'Nơi Này Có Anh (Masew Remix)',
        cover: 'assets/Nơi_này_có_anh_-_Single_Cover.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/NangAmXaDan-MTP-2697291.mp3',
        displayName: 'Nắng Ấm Xa Dần',
        cover: 'assets/nang_am_xa_dan.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/NhuNgayHomQuaUpgrade-SonTungMTP-4282962.mp3',
        displayName: 'Như Ngày Hôm Qua',
        cover: 'assets/nhu_ngay_hom_qua.jpg',
        artist: 'Sơn Tùng M-TP',
    },
    {
        path: 'assets/Am Tham Ben Em - Son Tung M-TP - NhacHay360.mp3',
        displayName: 'Âm Thầm Bên Em',
        cover: 'assets/am_tham_ben_em.jpg',
        artist: 'Sơn Tùng M-TP',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Tạm Dừng');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Tiếp tục');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function ChangeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime (duration / 60) } : ${formatTime (duration % 60) }`;
    currentTimeEl.textContent = `${formatTime (currentTime / 60) } : ${formatTime (currentTime % 60) }`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => ChangeMusic(-1));
nextBtn.addEventListener('click', () => ChangeMusic(1));
music.addEventListener('ended', () => ChangeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
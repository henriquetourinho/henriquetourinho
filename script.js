// --- ELEMENTOS DA PÁGINA ---
const statusContainer = document.getElementById('status-container');
const temporaryStatus = document.getElementById('temporary-status');
const countdownContainer = document.getElementById('countdown-container');
const profileText = document.getElementById('profile-text');
const backgroundAudio = document.getElementById('background-audio');
const audioControlButton = document.getElementById('audio-control-button');
const accessCounter = document.getElementById('access-counter');
const recentJoins = document.getElementById('recent-joins');
const recentCount = document.getElementById('recent-count');
const mainWhatsappButton = document.getElementById('whatsapp-share-button-main');
const twitterShareButton = document.getElementById('twitter-share-button');
const facebookShareButton = document.getElementById('facebook-share-button');

// Elementos para a funcionalidade de denúncia
const complaintFormContainer = document.getElementById('complaint-form-container');
const complaintListContainer = document.getElementById('complaint-list-container');
const complaintForm = document.getElementById('complaint-form');
const complaintStatusMessage = document.getElementById('complaint-status-message');
const openComplaintFormBtn = document.getElementById('open-complaint-form-btn'); // Note: This button is in the old design, but the logic is kept for potential future use.
const openComplaintListBtn = document.getElementById('open-complaint-list-btn'); // Note: This button is in the old design as well.
const cancelComplaintButton = document.querySelector('#complaint-form-container .cancel-complaint-button');
const backToMainButton = document.querySelector('#complaint-list-container .back-to-main-button');

// --- LÓGICA DE STATUS (PÓS-PRISÃO DOMICILIAR) ---

function updateBrowserTab(estaPreso) {
    const favicon = document.querySelector("link[rel='icon']");
    const baseTitle = "Status do Bolsonaro";
    // Verde = Ameaça contida
    const faviconPreso = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%238ee09f%22/></svg>";

    if (estaPreso) {
        document.title = `🟢 PRESO EM CASA - ${baseTitle}`;
        favicon.href = faviconPreso;
    }
    // Não há outro estado, então não precisamos de um 'else'
}

// --- FUNÇÃO PRINCIPAL DE ATUALIZAÇÃO DE STATUS ---
function updateStatus() {
    // Com a prisão domiciliar, o status é fixo.
    const estaPreso = true;
    
    // Define a classe do container para o estilo de "contido" (verde)
    statusContainer.className = 'recolhido'; // Reutilizando a classe 'recolhido' para o status de preso
    
    // Atualiza o texto principal do status
    temporaryStatus.textContent = 'PRESO EM CASA';
    
    // Remove o contador e exibe as condições da prisão
    countdownContainer.innerHTML = `
        <p class="info-text"><strong>Condições:</strong> Monitoramento 24h com tornozeleira eletrônica. Proibido de receber visitas (exceto família e advogados) e de usar celulares e redes sociais.</p>
        <p class="countdown-label">SEGURANÇA NACIONAL: ATIVA</p>
    `;
    
    updateBrowserTab(estaPreso);
}

// --- LÓGICA DE ANÁLISE PSICOLÓGICA ---
const profileLines=[
    "Nível de Ameaça: CONTIDO (Risco de usar terceiros para comunicação)",
    "Estado Emocional: Confinado e irritadiço.",
    "Capacidade Cognitiva: Estável (em negação permanente).",
    "Humor: Abstinência severa de lives e motociatas.",
    "Nível de Copium: CRÍTICO.",
    "Pensamento Recorrente: 'A culpa é do Moraes.'",
    "Atividade Cerebral: Detectada tentativa de culpar o sistema.",
    "Probabilidade de Fuga: BAIXA (Tornozeleira ativa).",
    "Memória Afetiva: Lembranças de um Jet Ski e da embaixada da Hungria.",
    "Avaliação de Risco: Perigo constante de violar as cautelares."
];
let profileIndex=0;
function updateProfile(){
    if(!profileText) return;
    profileText.classList.add("fade-out");
    setTimeout(() => {
        profileIndex = (profileIndex + 1) % profileLines.length;
        profileText.textContent = profileLines[profileIndex];
        profileText.classList.remove("fade-out");
    }, 400);
}

// --- CONTROLE DE ÁUDIO ---
if(audioControlButton){
    audioControlButton.addEventListener("click", () => {
        if (backgroundAudio.paused) {
            backgroundAudio.play().catch(e=>console.log("Autoplay bloqueado"));
            audioControlButton.textContent = "🔊";
        } else {
            backgroundAudio.pause();
            audioControlButton.textContent = "🔇";
        }
    });
}

// --- LÓGICA DO CONTADOR DE ACESSOS (SIMULADO) ---
function setupAccessCounter() {
    if (!accessCounter) return;

    let currentAccessCount = Math.floor(Math.random() * 500) + 2500;
    accessCounter.textContent = currentAccessCount;

    let recentJoinCount = 0;
    
    setInterval(() => {
        let change = Math.floor(Math.random() * 21) - 10;
        const hour = new Date().getHours();
        if ((hour >= 9 && hour < 12) || (hour >= 18 && hour < 21)) {
            change += Math.floor(Math.random() * 10);
        }
        currentAccessCount += change;
        if (currentAccessCount < 2000) {
            currentAccessCount = 2000 + Math.floor(Math.random() * 100);
        }
        accessCounter.textContent = currentAccessCount;

        if (change > 5 && recentJoins) {
            recentJoinCount += change;
            recentCount.textContent = recentJoinCount;
            recentJoins.style.opacity = 1;
            recentJoins.style.transition = 'opacity 0.5s ease-in-out';
            setTimeout(() => {
                 recentJoins.style.opacity = 0;
                 setTimeout(() => { recentJoinCount = 0; }, 500);
            }, 4500);
        }
    }, 2500);
}

// --- Lógica de exibição das seções (Denúncia) ---
function showMainContent() {
    document.querySelectorAll('.container > div, .features-section').forEach(section => {
        if (section.id !== 'complaint-form-container' && section.id !== 'complaint-list-container') {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });
     document.querySelector('main.container').classList.remove('hidden');
}

// Simulação de botões para abrir formulário de denúncia (se existissem)
document.addEventListener('click', function (e) {
    if (e.target && e.target.id === 'open-complaint-form-btn') { // Exemplo de gatilho
        e.preventDefault();
        document.querySelectorAll('.container > div, .features-section').forEach(section => section.classList.add('hidden'));
        complaintFormContainer.classList.remove('hidden');
        complaintStatusMessage.classList.add('hidden');
    }
});


if (cancelComplaintButton) {
    cancelComplaintButton.addEventListener('click', () => {
        complaintForm.reset();
        showMainContent();
        complaintFormContainer.classList.add('hidden');
    });
}

if (backToMainButton) {
    backToMainButton.addEventListener('click', () => {
        showMainContent();
        complaintListContainer.classList.add('hidden');
    });
}

if (complaintForm) {
    complaintForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log("Simulando envio de denúncia:", new FormData(complaintForm));

        complaintStatusMessage.textContent = '✅ Denúncia registrada com sucesso! Agradecemos sua colaboração.';
        complaintStatusMessage.className = 'complaint-message success';
        complaintStatusMessage.classList.remove('hidden');
        complaintForm.reset();

        setTimeout(() => {
            complaintFormContainer.classList.add('hidden');
            complaintStatusMessage.classList.add('hidden');
            showMainContent();
        }, 5000);
    });
}


// --- CONFIGURAÇÃO DOS ELEMENTOS INTERATIVOS ---
function setupInteractiveElements(){
    const siteUrl = "https://statusdobolsonaro.org"; // Substitua pela URL real

    // --- WhatsApp ---
    const shareMessage = `🚨 ATENÇÃO: Bolsonaro está em PRISÃO DOMICILIAR!\n\nAcompanhe o status do detento e os desdobramentos em tempo real. A vigilância é crucial:\n\n${siteUrl}`;
    const encodedMessage = encodeURIComponent(shareMessage);
    if (mainWhatsappButton) mainWhatsappButton.href = `https://wa.me/?text=${encodedMessage}`;

    // --- Twitter / X ---
    const twitterTaunts = [
        "O pijama virou uniforme oficial. Acompanhe a rotina do ex-presidente em prisão domiciliar:",
        "Sem celular, sem live, sem motociata. Veja o status atualizado do preso em Brasília:",
        "A casa caiu. Literalmente. Bolsonaro agora cumpre prisão domiciliar. Fiscalize aqui:",
        "Status: com saudades de um sigilo de 100 anos. Acompanhe o dia a dia do detento de Brasília aqui:",
        "Da série 'a justiça tarda, mas não falha': o ex-presidente está de tornozeleira. Monitore aqui:"
    ];
    const randomTwitterTaunt = twitterTaunts[Math.floor(Math.random() * twitterTaunts.length)];
    const twitterMessage = `${randomTwitterTaunt} ${siteUrl}`;
    if (twitterShareButton) twitterShareButton.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(twitterMessage)}`;

    // --- Facebook ---
    const facebookTaunts = [
        "A justiça tarda, mas não falha. Bolsonaro está em prisão domiciliar. Compartilhe para que todos saibam!",
        "Fim da linha para as motociatas. Agora é só caminhada da sala pra cozinha. Acompanhe o status do preso:",
        "Notícias direto da prisão domiciliar! Veja o que o inelegível está fazendo (ou melhor, não fazendo) e compartilhe:"
    ];
    const randomFacebookTaunt = facebookTaunts[Math.floor(Math.random() * facebookTaunts.length)];
    const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(siteUrl)}&quote=${encodeURIComponent(randomFacebookTaunt)}`;
    if (facebookShareButton) facebookShareButton.href = facebookLink;
}

// --- INICIA OS CICLOS DE ATUALIZAÇÃO ---
document.addEventListener("DOMContentLoaded", () => {
    // A atualização de status agora é chamada apenas uma vez, pois é estática.
    updateStatus(); 
    
    if (profileText) {
        updateProfile();
        setInterval(updateProfile, 5000);
    }

    setupAccessCounter();
    setupInteractiveElements();
    showMainContent();
});
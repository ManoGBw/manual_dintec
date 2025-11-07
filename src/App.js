import React, { useState } from "react";
import "./styles.css";

// --- Componente 1: Imagem com Legenda ---
function ImageWithCaption({ placeholderText, caption, imageNumber }) {
  return (
    <div className="image-container">
      <img src={placeholderText} alt={caption} className="tutorial-image" />
      <div className="caption-box">
        <span>{caption}</span>
        <span>Imagem {imageNumber} de 1</span>
      </div>
    </div>
  );
}

// --- Componente 2: Caixa de Nota ---
function NoteBox({ children }) {
  return (
    <div className="note-box">
      <strong>Nota:</strong> {children}
    </div>
  );
}

// --- DADOS PARA O CARROSSEL ---
const stepsGerarVenda = [
  {
    icon: "📝",
    title: "1. Cadastro do Cliente",
    description:
      "Certifique-se de que o cadastro do cliente na venda esteja completo. É essencial que contenha CPF ou CNPJ e o endereço completo, especialmente o CEP.",
    imgPlaceholder: "/images/venda-par1.png", // Recomendei renomear sem espaços
    caption: "Tela de cadastro do cliente com CPF/CNPJ e endereço completo",
    note: "O cadastro incompleto pode gerar erros na emissão do boleto.",
  },
  {
    icon: "🛒",
    title: "2. Lançamento dos Produtos",
    description: "Insira os produtos ou serviços na venda como de costume.",
    imgPlaceholder: "/images/venda-par2.png", // Recomendei renomear sem espaços
    caption: "Interface de lançamento de produtos na venda",
    note: null,
  },
  {
    icon: "💳",
    title: "3. Finalização e Forma de Pagamento",
    description:
      'Clique em "FINALIZA" (ou F12). Na tela de Formas de Pagamento, selecione a opção "A PRAZO" e defina a situação como "PRESTAÇÃO-BO".',
    imgPlaceholder: "/images/venda-par3.png", // Recomendei renomear sem espaços
    caption:
      'Seleção da forma de pagamento "A PRAZO" e situação "PRESTAÇÃO-BO"',
    note: null,
  },
  {
    icon: "📄",
    title: "4. Confirmação e Impressão",
    description:
      'Na tela "GERAR BOLETOS", clique em "OK". Você poderá escolher entre "Sim" para gerar o PDF imediatamente ou "Não" para apenas registrar o boleto no sistema e enviá-lo depois.',
    imgPlaceholder: "/images/venda-par4.png", // Recomendei renomear sem espaços
    caption: "Tela de confirmação para geração de boletos",
    note: "Importante: Após gerar o boleto, é fundamental criar e enviar o arquivo de remessa ao banco.",
  },
];

// --- Componente 3: Resumo Lateral ---
// **MUDANÇA**: Agora aceita 'activeNote' e renderiza o NoteBox
function SummarySidebar({ steps, currentStep, setCurrentStep, activeNote }) {
  return (
    <aside className="summary-sidebar">
      <h3>Resumo da Rotina</h3>

      <ul className="summary-steps">
        {steps.map((step, index) => (
          <li
            key={index}
            className={index === currentStep ? "active" : ""}
            onClick={() => setCurrentStep(index)}
          >
            <span>{step.title}</span>
          </li>
        ))}
      </ul>

      {/* **NOVO**: Container da nota adicionado ao final */}
      <div className="summary-note-container">
        {activeNote && <NoteBox>{activeNote}</NoteBox>}
      </div>
    </aside>
  );
}

// --- Componente 4: Conteúdo Principal (Lado Direito) ---
function MainContent({ activeTopic }) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < stepsGerarVenda.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderTopicContent = (topic) => {
    switch (topic) {
      case "introducao":
        return (
          <>
            <h1>Manual de Utilização de Boletos</h1>
            <p>
              Bem-vindo ao manual de ajuda do sistema Dintec. Selecione um
              tópico no menu ao lado para começar.
            </p>
          </>
        );

      case "gerar-venda":
        const step = stepsGerarVenda[currentStep];

        return (
          <>
            <h1>Gerar Boleto pela Venda</h1>
            <p>
              Processo completo para gerar um boleto diretamente de uma venda no
              Dintec.
            </p>

            <div className="carousel-container">
              <h2>📖 {step.title}</h2>
              <p>{step.description}</p>

              <ImageWithCaption
                placeholderText={step.imgPlaceholder}
                caption={step.caption}
                imageNumber={currentStep + 1}
              />

              {/* **MUDANÇA**: A linha do NoteBox foi REMOVIDA daqui */}
            </div>

            {/* A Barra de navegação continua aqui em baixo */}
            <div className="summary-nav">
              <button onClick={handlePrev} disabled={currentStep === 0}>
                &larr; Anterior
              </button>
              <span>
                Passo {currentStep + 1} de {stepsGerarVenda.length}
              </span>
              <button
                onClick={handleNext}
                disabled={currentStep === stepsGerarVenda.length - 1}
              >
                Próximo &rarr;
              </button>
            </div>
          </>
        );

      // (Restante dos 'cases'...)
      case "gerar-nfe":
        return (
          <>
            <h1>Gerar Boleto pela NFe</h1>
            <p>Este método garante que o número da NFe apareça no boleto...</p>
          </>
        );

      default:
        return (
          <>
            <h1>{activeTopic.replace(/-/g, " ")}</h1>
            <p>
              Conteúdo para <strong>{activeTopic}</strong> ainda não
              implementado.
            </p>
          </>
        );
    }
  };

  return (
    <main className="main-content">
      <div className="content-wrapper">
        <div className="content-panel">{renderTopicContent(activeTopic)}</div>

        {activeTopic === "gerar-venda" && (
          // **MUDANÇA**: Passando a nota do passo atual para o SummarySidebar
          <SummarySidebar
            steps={stepsGerarVenda}
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            activeNote={stepsGerarVenda[currentStep].note}
          />
        )}
      </div>
    </main>
  );
}

// --- Componente 5: Barra Lateral (Lado Esquerdo) ---
// (Sem alterações na lógica)
function Sidebar({ activeTopic, setActiveTopic }) {
  const [isBoletoOpen, setIsBoletoOpen] = useState(true);

  const handleNavClick = (topic) => {
    setActiveTopic(topic);
  };

  const handleParentClick = (e, topic) => {
    e.preventDefault();
    setIsBoletoOpen(!isBoletoOpen);
    if (!isBoletoOpen) {
      setActiveTopic("introducao");
    }
  };

  const isActive = (topic) => (activeTopic === topic ? "active" : "");

  return (
    <aside className="sidebar">
      <h2>Menu de Ajuda</h2>
      <nav>
        <ul>
          {/* (Links do menu...) */}
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("cadastros")}
              className={isActive("cadastros")}
            >
              Cadastros
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("notas-fiscais")}
              className={isActive("notas-fiscais")}
            >
              Notas Fiscais
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("pedido-venda")}
              className={isActive("pedido-venda")}
            >
              Pedido de Venda
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("caixa")}
              className={isActive("caixa")}
            >
              Caixa
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("relatorios")}
              className={isActive("relatorios")}
            >
              Relatórios e Gráficos
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("contas-pagar")}
              className={isActive("contas-pagar")}
            >
              Contas a Pagar
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavClick("contas-receber")}
              className={isActive("contas-receber")}
            >
              Contas a Receber
            </a>
          </li>

          <li className="has-submenu">
            <a
              href="#"
              onClick={(e) => handleParentClick(e, "boletos")}
              className={`submenu-trigger ${isBoletoOpen ? "open" : ""}`}
            >
              Boletos
              <span className="arrow">{isBoletoOpen ? "▼" : "▶"}</span>
            </a>
            {isBoletoOpen && (
              <ul className="submenu">
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("introducao")}
                    className={isActive("introducao")}
                  >
                    Introdução
                  </a>
                </li>
                <li className="submenu-title">Geração de Boletos</li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("gerar-venda")}
                    className={isActive("gerar-venda")}
                  >
                    Gerar pela Venda
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("gerar-nfe")}
                    className={isActive("gerar-nfe")}
                  >
                    Gerar pela NFe
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    onClick={() => handleNavClick("recuperacao")}
                    className={isActive("recuperacao")}
                  >
                    Recuperação de Geração
                  </a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
}

// --- Componente Principal da Aplicação ---
// (Sem alterações)
export default function App() {
  const [activeTopic, setActiveTopic] = useState("gerar-venda");

  return (
    <div className="app-container">
      <Sidebar activeTopic={activeTopic} setActiveTopic={setActiveTopic} />
      <MainContent activeTopic={activeTopic} />
    </div>
  );
}

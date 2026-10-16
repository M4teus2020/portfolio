# COPY.md · felini.dev v2

> **Depois da aprovação, a fonte final é `src/i18n/locales/pt.ts`.** Ajustes de 2026-10-16: sem cidade em nenhum lugar, rodapé sem "teimosia", título do Sobre "Do balcão da loja ao sistema financeiro.".
> Texto antes do código. PT é a fonte; o EN sai como tradução depois que o PT for aprovado.
> Regras: só fatos verdadeiros (base: `carreira/ficha-profissional.md`), nada interno da Soluct, sem "procurando vaga", sem travessão.
> `[A CONFIRMAR]` = dado que o Mateus precisa validar antes de ir pro ar.

---

## 0. Global

**Menu:** Projetos · Sobre · Sites · Contato · [PT | EN]
**Rodapé:** Mateus Felini · Ibiaçá, RS · feito com Vue e um pouco de teimosia.
Links: e-mail · LinkedIn · GitHub · Currículo (PDF)

**Meta (SEO/compartilhamento)**
- Título: Mateus Felini · Desenvolvedor full-stack (Laravel e Vue)
- Descrição: Desenvolvedor full-stack no interior do RS. Três anos construindo sistemas web para o setor financeiro, de cooperativas de crédito a plataformas multi-cliente.

---

## 1. Home `/`

### 1.1 Hero (cabe na primeira tela)
**Kicker:** Desenvolvedor full-stack · Laravel e Vue

**Título:** Construo sistemas web que empresas usam o dia inteiro.

**Linha de apoio:** Três anos em produção no setor financeiro: cobrança, atendimento, auditoria. Do banco de dados à tela, com código que o próximo dev consegue ler.

**Ficha (linha discreta):** Ibiaçá, RS · remoto ou híbrido · português nativo, inglês avançado

**Botões:** [Ver trajetória] [Baixar currículo] · LinkedIn

> Espaço reservado à direita pra foto real. Sem foto: hero só tipográfico (o nome grande vira o elemento visual).

### 1.2 Faixa de prova (3 itens, números verdadeiros)
- **3+ anos** em produção, desde abril de 2023
- **150 mil+** registros por dia na plataforma em que trabalho hoje
- **IA no método**, não no lugar dele: Claude Code com testes e revisão

> O "150 mil+ por dia" já está no LinkedIn público. Se preferir não usar, troca por "setor financeiro desde o primeiro dia".

### 1.3 Projetos em destaque (escondido até existir case)
**Título:** Projetos
**Subtítulo:** Problema, decisão e resultado. Um de cada vez, bem contado.
> Seção existe no código e só aparece com `cases.length > 0`. Cada card: nome, frase do problema, 3 tags de stack, "Ler o case".

### 1.4 Como eu trabalho
**Título:** Como eu trabalho.

1. **Entendo o negócio antes do código.** Sistema financeiro não perdoa regra mal entendida. Pergunto até saber por que a regra existe.
2. **Teste primeiro, agente depois.** Escrevo o teste, deixo o Claude Code propor a implementação e reviso. O teste é a especificação que o agente não consegue contornar.
3. **Performance é parte da entrega.** Query lenta, N+1 e relatório que trava viram tarefa, não detalhe pra depois.
4. **Segurança desde o primeiro SQL.** Comecei em PHP puro, escrevendo SQL à mão. Desconfiar de toda entrada virou hábito.

**Fecho:** IA não toma decisão de engenharia por mim. Ela tira a parte repetitiva do caminho e sobra tempo pro que importa.

### 1.5 Trajetória curta
**Título:** Trajetória.

- **2024 até hoje · Soluct Soluções em Sistemas** · Tapejara, RS
  Full-stack (Laravel e Vue) numa plataforma multi-cliente de operações financeiras: integrações, dashboards e fluxos que as equipes usam o dia todo.
- **2023 a 2024 · HGV Sistemas** · Tapejara, RS
  Primeiro emprego como dev: PHP, MySQL e SQL Server em sistemas para o setor financeiro. Saí promovido, com ferramentas internas que aceleraram o time.

**Link:** A história inteira está em [Sobre](/sobre).

> Deixei de fora "Comecei como front-end", que está na v1. [A CONFIRMAR] se quer manter.

### 1.6 Contato
**Título:** Vamos conversar?
**Texto:** Respondo e-mail em até um dia útil.
**Linha:** mfelini7@gmail.com · LinkedIn · GitHub · Currículo (PDF)
> Sem formulário. Botão "copiar e-mail" ao lado do endereço.

---

## 2. Sobre `/sobre`

**Título:** Dev do interior, sistema de verdade.

**Abertura:**
Sou o Mateus, de Ibiaçá, no norte do Rio Grande do Sul. Trabalho com desenvolvimento web desde 2023, sempre em sistemas que mexem com dinheiro de alguém: cobrança, atendimento, auditoria. Gosto desse tipo de software justamente porque erro ali tem custo, e isso obriga a fazer direito.

### Antes do código
Antes de programar, trabalhei numa loja de informática da cidade e fazia de tudo: manutenção de computador e celular, vendas, instalação de internet. Foi ali que aprendi como funciona um negócio pequeno por dentro, e é por isso que hoje também faço sites para o comércio da região.
> [A CONFIRMAR] período na Trentin Informática e se pode citar (não está no LinkedIn). Sem nome da loja no texto.

### 2023 · HGV Sistemas
Meu primeiro emprego como dev. PHP sem framework, SQL escrito à mão, sistemas para o setor financeiro. Ali aprendi o peso de mexer com dado financeiro: encontrei e reportei uma falha de segurança crítica no sistema, e criei um gerador de código que acabou com o copia e cola no início de cada funcionalidade. Também ajudei a integrar os devs que chegaram depois de mim.

### 2024 · Soluct
Saí da HGV por escolha: queria uma stack moderna e mais espaço pra crescer, e aceitei recomeçar por isso. Na Soluct trabalho com Laravel, Vue e TypeScript numa plataforma multi-cliente de operações financeiras, com integrações (WhatsApp, telefonia, e-mail, boletos), filas, relatórios e otimização de performance.
> Sem citar salário nem contraproposta. Sem nomes de módulos internos.

### Hoje
Uso IA como parte do método: Claude Code, agentes e testes automatizados no mesmo fluxo. Fora do trabalho, montei com essa abordagem um processo para criar sites para restaurantes e lojas da região.

### O que eu levo para um time
- Entendo regra de negócio e faço a pergunta que falta.
- Cuido de performance e segurança sem precisar de ticket pra isso.
- Escrevo código pensando em quem vai mantê-lo.
- Uso IA com critério: rápido sem ser descuidado.

### Ferramentas (compacto, no fim da página)
- **Uso todo dia:** PHP, Laravel, Vue 3, TypeScript, PostgreSQL, MySQL, Redis, Docker, Git, GitHub Actions, Linux
- **Testes:** PHPUnit, Pest, Vitest
- **IA:** Claude Code, agentes e MCPs, GitHub Copilot, Ollama
- **Arquitetura:** multi-tenant, Clean Architecture, SOLID, DDD

### Formação
Análise e Desenvolvimento de Sistemas · Universidade de Passo Fundo [A CONFIRMAR status: cursando, trancado ou concluído]

**CTA:** [Baixar currículo] [Falar comigo]

---

## 3. Sites `/sites` (dono de comércio, zero jargão)

> Destino do crédito "Site por Mateus Felini" nos rodapés dos clientes. Tom de vizinho, não de agência.

### 3.1 Topo
**Título:** Seu negócio aparecendo no Google, com a cara dele.
**Texto:** Faço o site do seu restaurante ou loja, coloco no ar e cuido dele todo mês. Você continua atendendo pelo WhatsApp, só que agora mais gente te acha.
**Botão:** [Chamar no WhatsApp]
> Número [A CONFIRMAR com o Mestre/Mateus]. Mensagem pronta do link: "Oi Mateus, vi o site e quero saber como funciona."

### 3.2 Por que ter site
- **Te acham no Google.** Quem procura "pizzaria em Sananduva" cai em quem aparece.
- **Cardápio, horário e endereço num lugar só.** Sem depender do cliente rolar o Instagram.
- **O pedido continua chegando no WhatsApp.** O site leva o cliente até você, não muda seu jeito de atender.

### 3.3 Como funciona
1. **A gente conversa.** Você me conta do negócio, eu pergunto o que importa.
2. **Monto uma prévia.** Com seu logo, suas fotos e seu jeito. Você vê antes de decidir.
3. **O site entra no ar.** Com endereço próprio (seunegocio.com.br) e mapa.
4. **Eu cuido todo mês.** Mudou horário, prato ou promoção? Me manda que eu atualizo.

### 3.4 Exemplos da região
**Título:** Feitos aqui perto.
Cards: WILL's Burger (Ibiaçá) · Forti Pizzaria (Sananduva) · Kenji Sushibar (Tapejara)
Selo em cada um: **exemplo** (enquanto não for cliente).
> Só entra o que o dono autorizar. Até lá, [A CONFIRMAR] se mostra as demos com selo "exemplo" ou se a seção espera o 1º cliente. Minha sugestão: esperar, porque mostrar a marca de alguém sem autorização pega mal na cidade pequena.

### 3.5 Preço
**Opção A (mostra):** A partir de R$ 400 para montar e R$ 59 por mês, com domínio, hospedagem e atualizações.
**Opção B (não mostra):** Preço justo, combinado na conversa. Sem fidelidade longa.
> [A CONFIRMAR] A ou B. Na nota do projeto há R$ 497 de setup no plano Essencial; o briefing diz R$ 400 a 500. Precisa de 1 número só.

### 3.6 Perguntas rápidas
- **Preciso entender de internet?** Não. Você me manda as fotos e as informações, eu faço o resto.
- **Quanto tempo leva?** Poucos dias depois da conversa.
- **E se eu quiser mudar algo?** Me chama no WhatsApp. Faz parte da mensalidade.
- **O site é meu?** O endereço (seunegocio.com.br) fica no seu nome. [A CONFIRMAR]

### 3.7 Fecho
**Título:** Bora colocar seu negócio no mapa?
**Botão:** [Chamar no WhatsApp]
**Linha:** Mateus Felini · Ibiaçá, RS · atendo Ibiaçá, Tapejara, Sananduva e região

---

## 4. Modelo de estudo de caso `/projetos/<slug>`

**Cabeçalho:** Nome do projeto · uma frase do que é · [Ver no ar] [Código] (quando houver)
**Ficha lateral:** Ano · Meu papel · Stack · Tempo de leitura

1. **Problema.** Quem sofria e com o quê, em 2 ou 3 frases, sem termo técnico.
2. **Meu papel.** O que foi meu de verdade (sozinho, liderei, participei).
3. **Decisões.** 2 ou 3 escolhas, cada uma com: o que escolhi, o que descartei, por quê.
4. **Resultado.** O que mudou, com print. Número só se for real; senão, efeito concreto ("abre rápido no celular", "o dono atualiza sem me chamar").
5. **Próximo passo.** Uma linha do que eu faria a seguir.

**Rodapé do case:** [Próximo case] [Voltar pros projetos]

> Exemplo de texto (para quando o primeiro site virar cliente de verdade, NÃO publicar antes):
> "Uma hamburgueria de Ibiaçá só existia no Instagram e num sistema de pedidos que não aparecia no Google. Montei um processo com Claude Code que pesquisa o negócio, junta logo e fotos reais e gera o site com a identidade da casa. Resultado: [preencher com o que for real]."

---

## Decisões que tomei no texto (pra revisar)
1. Tirei do esboço "sites no ar" e "nota 7,6": as demos não são clientes ainda e a nota é avaliação interna. Não aparece em lugar nenhum.
2. Tirei da v1 o que não está na ficha: AWS, Node como stack principal, "já integrei LLMs em produto (extração de documentos...)".
3. Hero sem "3 anos" no título (fica na faixa de prova) pra não envelhecer.
4. Cidade: "Ibiaçá, RS". O LinkedIn diz Tapejara. [A CONFIRMAR] qual usar.

## Pendências pra ir ao ar
- [ ] Número de WhatsApp do /sites
- [ ] Mostrar preço? (A ou B) e valor único de setup
- [ ] Mostrar demos com selo "exemplo" ou esperar 1º cliente
- [ ] Período da loja de informática e se cita
- [ ] Status da faculdade
- [ ] Currículo PDF e foto real (não bloqueiam)

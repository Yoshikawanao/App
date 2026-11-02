# Meus aportes

Painel para registrar aportes mensais em caixinhas que rendem % do CDI, com a visão de cada pessoa e a soma das duas. Site estático (HTML) com login e banco de dados no Firebase (plano gratuito).

## Passo a passo

1. **Crie o projeto**: em https://console.firebase.google.com clique em *Adicionar projeto* (pode desativar o Google Analytics).
2. **Ative o login**: *Build → Authentication → Sign-in method* → habilite **E-mail/senha**.
3. **Crie o app web**: *Configurações do projeto (engrenagem) → Seus apps → ícone `</>`*. Copie o objeto `firebaseConfig` para o arquivo `firebase-config.js`.
4. **Crie o banco**: *Build → Firestore Database → Criar banco de dados* (modo produção).
5. **Cole as regras**: no Firestore, aba *Regras*. Cole o conteúdo de `firestore.rules`, troque os dois e-mails pelos de vocês e clique em *Publicar*.
6. **Publique o site**: neste repositório, *Settings → Pages → Deploy from a branch → main / (root)*. O link será `https://SEU_USUARIO.github.io/App/`.
7. **Autorize o domínio**: *Authentication → Settings → Domínios autorizados* → adicione `SEU_USUARIO.github.io`.
8. **Criem as contas**: cada pessoa abre o link, clica em *Criar conta* e usa o e-mail que está nas regras. Depois que as duas criarem, em *Authentication → Settings → User actions* desative a criação de novas contas.

## Como funciona
- Cada pessoa só consegue gravar e apagar na própria carteira (regra do Firestore, não só da tela).
- As duas leem os dados uma da outra para montar o painel Geral.
- Só os dois e-mails listados nas regras têm acesso aos dados.
- A chave do `firebase-config.js` pode ficar pública no GitHub; a proteção vem das regras.
- O rendimento é uma estimativa bruta (sem IR/IOF), com juros compostos por dias corridos sobre o CDI anual informado.

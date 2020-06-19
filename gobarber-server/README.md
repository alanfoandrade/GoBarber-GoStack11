# Recuperação de senha

**RF**

- O usuário deve poder solicitar alterção de senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções para alteração de senha;
- O usuário deve poder alterar sua senha;

**RNF**

- Utilizar Mailtrap para testar envios em ambiente de dev;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por e-mail para alterar senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao alterar senha;

# Atualização do perfil

**RF**

- O usuário deve poder alterar seu nome, email e senha;
- O usuário deve confirmar a senha ao alterar senha;

**RN**

- O usuário não pode alterar seu e-mail para um e-mail já utilizado;
- Para alterar sua senha, o usuário de informar a senha antiga;
- Para alterar sua senha, o usuário deve confirmar a nova senha;

# Agendamento de serviços

**RF**

- O usuário deve poder listar todos prestadores de serviço cadastrados;
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador;
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador;
- O usuário deve poder realizar um novo agendamento com um prestador;

**RNF**

- A listagem de prestadores deve ser armazenada em cache;

**RN**

- Cada agendamento deve durar 1h exatamente;
- Os agendamentos devem estar disponíveis entre 8h às 18h (Primeiro às 8h, último às 17h);
- O usuário não pode agendar em um horário já ocupado;
- O usuário não pode agendar em um horário que já passou;
- O usuário não pode agendar serviços consigo mesmo;

# Painel do prestador

**RF**

- O usuário deve poder listar seus agendamentos de um dia específico;
- O prestador deve receber uma notificação sempre que hovuer um novo agendamento;
- O prestador deve poder visualizar as notificações não lidas;

**RNF**

- Os agendamentos do prestador no dia devem ser amazenados em cache;
- As notificações do prestador devem ser armazenadas no MongoDB;
- As notificações do prestador devem ser enviadas em tempo real utilizando Socket.io;

**RN**

- A notificação deve ter um status de lida ou não-lida;

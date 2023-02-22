const renderFinanceElements = (data) => {
  const totalItems = data.length;
  const revenues = data
    .filter((item) => Number(item.value) > 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const expenses = data
    .filter((item) => Number(item.value) < 0)
    .reduce((acc, item) => acc + Number(item.value), 0);
  const totalValue = revenues + expenses;
  console.log({ totalItems, revenues, expenses, totalValue });

  // render total items
  const financeCard1 = document.getElementById("finance-card-1");
  const totalText = document.createTextNode(totalItems);
  const totalElement = document.createElement("h1");
  totalElement.className = "mt smaller";
  totalElement.appendChild(totalText);
  financeCard1.appendChild(totalElement);

  // render revenues
  const financeCard2 = document.getElementById("finance-card-2");
  const revenueText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(revenues)
  );
  const revenueElement = document.createElement("h1");
  revenueElement.className = "mt smaller";
  revenueElement.appendChild(revenueText);
  financeCard2.appendChild(revenueElement);

  // render expenses
  const financeCard3 = document.getElementById("finance-card-3");
  const expenseText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(expenses)
  );
  const expenseElement = document.createElement("h1");
  expenseElement.className = "mt smaller";
  expenseElement.appendChild(expenseText);
  financeCard3.appendChild(expenseElement);

  // render balance
  const financeCard4 = document.getElementById("finance-card-4");
  const balanceText = document.createTextNode(
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(totalValue)
  );
  const balanceElement = document.createElement("h1");
  balanceElement.className = "mt smaller";
  balanceElement.style.color = "#5936cd";
  balanceElement.appendChild(balanceText);
  financeCard4.appendChild(balanceElement);
};

const onLoadFinancesData = async () => {
  try {
    const date = "2022-12-15";
    const email = localStorage.getItem("@WalletApp:userEmail");
    const result = await fetch(
      `https://mp-wallet-app-api.herokuapp.com/finances?date=${date}`,
      {
        method: "GET",
        headers: {
          email: email,
        },
      }
    );
    const data = await result.json();
    renderFinanceElements(data);
    console.log(data);
    return data;
  } catch (error) {
    return { error };
  }
};

const onLoadUserInfo = () => {
  const email = localStorage.getItem("@WalletApp:userEmail");
  const name = localStorage.getItem("@WalletApp:userName");

  const navbarUserInfo = document.getElementById("navbar-user-container");
  const navbarUserAvatar = document.getElementById("navbar-user-avatar");

  // add user e-mail to navbar
  const emailElement = document.createElement("p");
  const emailText = document.createTextNode(email);
  emailElement.appendChild(emailText);
  navbarUserInfo.appendChild(emailElement);

  // add logout link
  const logoutElement = document.createElement("a");
  const logoutText = document.createTextNode("Sair");
  logoutElement.appendChild(logoutText);
  navbarUserInfo.appendChild(logoutElement);

  // add user first letter inside avatar
  const nameElement = document.createElement("h3");
  const nameText = document.createTextNode(name.charAt(0).toUpperCase());
  nameElement.appendChild(nameText);
  navbarUserAvatar.appendChild(nameElement);
};

window.onload = () => {
  onLoadUserInfo();
  onLoadFinancesData();
};

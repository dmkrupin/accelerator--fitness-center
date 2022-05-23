const membershipInfoElementsCollection = document.querySelector('.membership__info').children;
const membershipTabElementsCollection = document.querySelector('.membership__options').children;

const hideAllMembershipInfo = () => {
  for (let element of membershipInfoElementsCollection) {
    element.style.display = 'none';
  }
};

const deactivateAllMembershipTabsState = () => {
  for (let tab of membershipTabElementsCollection) {
    tab.classList.remove('is-active');
  }
};

const setMembershipTabs = () => {
  for (let tab of membershipTabElementsCollection) {
    tab.querySelector('a').addEventListener('click', (evt) => {
      evt.preventDefault();
      deactivateAllMembershipTabsState();
      evt.target.parentNode.classList.add('is-active');
      const macthingMembershipInfoElement = document.getElementById(evt.target.href.split('#').pop());
      hideAllMembershipInfo();

      macthingMembershipInfoElement.style.display = 'grid';
    });
  }
};

export const initTabs = () => {
  // прячем инфу по вариантам членства и выводим только первую - по умолчанию
  hideAllMembershipInfo();

  document.getElementById('1-month-membership').style.display = 'grid';

  // активируем переключение табов блока membership
  setMembershipTabs();
};

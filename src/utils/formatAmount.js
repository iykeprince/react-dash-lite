const formatAmount = (money) =>{ 
    new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(money)
}
export default formatAmount
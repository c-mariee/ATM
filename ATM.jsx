const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
    const choice = ['Deposit', 'Withdrawal'];
    const {Form, Button} = ReactBootstrap;
    console.log(`ATM isDeposit: ${isDeposit}`);

    const inputStyle = {
        backgroundColor: isDeposit ? '#E0FFFF' : 'lightpink',
      };

      return (
        <div className="center-container">
          <Form.Group>
          <Form.Label className="blue-text" style={{ color: 'lavender' }}>Enter the amount:</Form.Label>

            <Form.Control
              id="number-input"
              type="number"
              placeholder="$"
              onChange={onChange}
              style={inputStyle}
            />
          </Form.Group>
          <Button
            variant="secondary"
            type="submit"
            disabled={!isValid}
            value="Submit"
            id="submit-input"
            className="button-style"
            style={{ margin: '0 auto' }}
          >
            Confirm {choice[Number(!isDeposit)]}
          </Button>
        </div>
      );
    };
  
  const Account = () => {
    const [deposit, setDeposit] = React.useState(0);
    const [totalState, setTotalState] = React.useState(0);
    const [isDeposit, setIsDeposit] = React.useState(true);
    const [atmMode, setAtmMode] = React.useState('');
    const [validTransaction, setValidTransaction] = React.useState(false);
    const {Form} = ReactBootstrap; 
  
    let status = `Account Balance $ ${totalState} `;
    console.log(`Account Rendered with isDeposit: ${isDeposit}`);
    const handleChange = (event) => {
      let eTargetValue = event.target.value;
      console.log(Number(eTargetValue));
      if (Number(eTargetValue) <= 0) {
        return setValidTransaction(false);
      }
      if (atmMode === 'Cash Back' && Number(event.target.value) > totalState) {
        setValidTransaction(false);
      } else {
        setValidTransaction(true);
      }
      setDeposit(Number(eTargetValue));
    };
    const handleSubmit = (event) => {
      let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
      setTotalState(newTotal);
      setValidTransaction(false);
      event.preventDefault();
    };
  
    const handleModeSelect = (event) => {
      console.log(event.target.value);
      setAtmMode(event.target.value);
      setValidTransaction(false);
      setIsDeposit((event.target.value === 'Deposit') ? true : false);
    };
  
    return (
        <div className="center-container">
          <div className="h2">
            <div className="h3">
              <Form onSubmit={handleSubmit}>
              <h1 style={{ color: 'aliceblue', fontWeight: 'bold', textAlign: 'center' }}>My Account</h1>
                <h3 style={{ color: 'lavender', textAlign: 'center' }}>Select the action to perform</h3>
                <Form.Select aria-label="Select Example" onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
                  <option id="no-selection" value=""></option>
                  <option id="deposit-selection" value="Deposit">Deposit</option>
                  <option id="cashback-selection" value="Cash Back">Withdrawal</option>
                </Form.Select>
                {(atmMode !== "") && (<ATMDeposit onChange={handleChange} isDeposit={isDeposit} isValid={validTransaction}></ATMDeposit>
                )}
                <h2 style={{ color: 'aliceblue', fontWeight: 'bold', padding: '5px', textAlign: 'center' }} id="total">
                  {status}
                </h2>
              </Form>
            </div>
          </div>
        </div>
      );
    };
    
  // ========================================how
  ReactDOM.render(<Account />, document.getElementById('root'));
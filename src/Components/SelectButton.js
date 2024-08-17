import styled from "styled-components";

const ButtonBox = styled("button")`
  border: 1px solid gold;
  border-radius: 5px;
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  font-family: "Montserrat";
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "gold" : "transparent")};
  color: ${({ selected }) => (selected ? "black" : "")};
  font-weight: ${({ selected }) => (selected ? 700 : 500)};
  &:hover {
    background-color: gold;
    color: black;
  }
  width: 22%;
`;

const SelectButton = ({ children, selected, onClick }) => {
  return (
    <ButtonBox onClick={onClick} selected={selected}>
      {children}
    </ButtonBox>
  );
};

export default SelectButton;
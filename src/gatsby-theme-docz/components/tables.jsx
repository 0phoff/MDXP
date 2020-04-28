import React from 'react';
import {Link} from 'docz';
import {Styled} from 'theme-ui';


export const Param = ({values, name, nameCol="Name", ...props}) => {
  return (
    <Styled.table {...props}>
      <thead>
        {name && (
          <tr>
            <th colSpan='3' style={{textAlign:'center', textTransform: 'uppercase'}}>{name}</th>
          </tr>
        )}
        <Styled.tr>
          <Styled.th style={{width: '15%'}}>{nameCol}</Styled.th>
          <Styled.th style={{width: '25%'}}>Type</Styled.th>
          <Styled.th>Description</Styled.th>
        </Styled.tr>
      </thead>

      <tbody>
        {
          values.map((val, i) => {
            const [name, type, desc] = val;
            let typeElement;
            if (Array.isArray(type)) {
              if (type[1].startsWith('#')) {
                typeElement = <a href={type[1]}>{type[0]}</a>;
              }
              else {
                typeElement = <Link to={type[1]}>{type[0]}</Link>;
              }
            }
            else {
              typeElement = type;
            }

            return (
              <Styled.tr key={i}>
                <Styled.td>{name}</Styled.td>
                <Styled.td>{typeElement}</Styled.td>
                <Styled.td>{desc}</Styled.td>
              </Styled.tr>
            );
          })
        }
      </tbody>
    </Styled.table>
  );
};

export const Arg = (props) => <Param name="Arguments" {...props} />;
export const Return = (props) => <Param name="Returns" {...props} />;

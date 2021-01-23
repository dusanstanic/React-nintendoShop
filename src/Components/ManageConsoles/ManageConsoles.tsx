import React, { FunctionComponent, useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, RouteComponentProps } from "react-router-dom";
import classes from "./ManageConsoles.module.css";
import Aux from "../../hoc/Auxiliary";
import Console from "../../models/ConsoleM";
import * as ConsoleService from "../../service/ConsoleService";
import ConsoleForm from "./ConsoleForm/ConsoleForm";
import Product from "../../models/Product";

interface IProps extends RouteComponentProps {
  match: {
    isExact: boolean;
    params: { type: string };
    path: string;
    url: string;
  };
}

const ManageProducts: FunctionComponent<IProps> = (props) => {
  const [productData, setProductData] = useState<Product[]>();
  const [type, setType] = useState<string>("");

  useEffect(() => {
    const getProducts = async (type: string) => {
      let products: Product[] = [];

      if (type === "console") {
        const consoles = await ConsoleService.getConsoles();

        products = consoles.map((console) => {
          return {
            id: console.id ? console.id : 0,
            title: console.title,
            description: console.description,
            releaseDate: console.releaseDate,
            price: console.price,
            image: console.image,
          };
        });

        setProductData(products);
      }
    };

    let type = props.match.params.type;

    getProducts(type);
    setType(type);
  }, []);

  const generateProductRows = () => {
    let proudctRows: JSX.Element[] = [];

    if (productData) {
      proudctRows = productData.map((product) => {
        return (
          <tr key={product.id} className={classes["product-row"]}>
            <td>{product.title}</td>
            <td>{product.releaseDate}</td>
            <td>{product.price}</td>
            <td>
              <img src={product.image} />
            </td>
            <td>
              <button
                className={classes["product-update-btn"]}
                onClick={() => manageProduct("update", product.id)}
              >
                update
              </button>
            </td>
            <td>
              <button
                className={classes["product-delete-btn"]}
                onClick={() => manageProduct("delete", product.id)}
              >
                delete
              </button>
            </td>
          </tr>
        );
      });
    }

    return proudctRows;
  };

  const manageProduct = (
    manageConsoleOption: string,
    id: number | undefined
  ) => {
    if (manageConsoleOption === "add") {
      props.history.push({
        pathname: props.match.url + "/" + type + "Form/0",
        search: "type=add&id=0",
      });
    } else if (manageConsoleOption === "update") {
      props.history.push({
        pathname: props.match.url + "/" + type + "Form/" + id,
        search: "type=update&id=" + id,
      });
    } else {
      if (!id) {
        return;
      }
      if (type === "console") {
        ConsoleService.deleteById(id);
      }
    }
  };

  const updateTable = async () => {
    let products: Product[] = [];

    if (type === "console") {
      const consoles = await ConsoleService.getConsoles();
      products = consoles.map((console) => {
        return {
          id: console.id ? console.id : 0,
          title: console.title,
          description: console.description,
          releaseDate: console.releaseDate,
          price: console.price,
          image: console.image,
        };
      });

      setProductData(products);
    }
  };

  return (
    <Aux>
      <div className={classes["manage-product-header"]}>
        <h2>Consoles</h2>
      </div>
      <div className={classes["manage-products-add-btn-wrapper"]}>
        <button onClick={() => manageProduct("add", 0)}>Add +</button>
      </div>
      <table className={classes["product-table"]}>
        <thead>
          <tr className={classes["product-row"]}>
            <th>Title</th>
            <th>Release Date</th>
            <th>Price</th>
            <th>Image</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>{generateProductRows()}</tbody>
      </table>
      <div className={classes["product-form"]}>
        <Route
          path={props.match.url + "/consoleForm/:id"}
          render={() => <ConsoleForm {...props} updateTable={updateTable} />}
        />
      </div>
    </Aux>
  );
};

const mapStateToProp = (state: any) => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(mapStateToProp, mapDispatchToProps)(ManageProducts);

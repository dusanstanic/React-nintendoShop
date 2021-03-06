import React, { useEffect, useState } from "react";
import classes from "./Games.module.scss";
import { Route } from "react-router-dom";
import { RouteComponentProps } from "react-router-dom";

import GameM from "../../shared/models/GameM";

import Aux from "../../hoc/Auxiliary";

import { GameDisplayState } from "../../store/reducers/gameDisplay";
import { GameDataState } from "../../store/reducers/gameData";

import GameSearchOptions from "./GameSearchOptions/GameSearchOptions";
import Game from "./Game/Game";
import GameDetails from "../GameDetails/GameDetails";

interface PropsI
  extends RouteComponentProps<{}>,
    GameDisplayState,
    GameDataState {
  setGames: (games: GameM[]) => void;
  setSelectedPgRatings: (pgRatings: string[]) => void;
  setSelectedGenres: (genres: string[]) => void;
  setSelectedGames: (games: GameM[]) => void;
  setSelectedGamesByPgRating: (games: GameM[]) => void;
  setSelectedGamesByGenre: (games: GameM[]) => void;
}

const Games = (props: PropsI) => {
  const [selectedGames, setSelectedGames] = useState<JSX.Element[]>();

  useEffect(() => {
    setSelectedGames(
      props.selectedGames.map((game: GameM) => {
        return (
          <Game key={game.id} game={game} showGame={() => showGame(game.id)} />
        );
      })
    );
  }, [props.selectedGames]);

  useEffect(() => {
    setSelectedGames(
      props.games.map((game: GameM) => {
        return (
          <Game key={game.id} game={game} showGame={() => showGame(game.id)} />
        );
      })
    );
  }, []);

  const showGame = (id: number | undefined) => {
    props.history.push({ pathname: "/games/" + id });
  };

  return (
    <Aux>
      <div className={classes["games-grid"]}>
        <div className={classes["games-grid__search-filter"]}>
          <h2>Nintendo Games</h2>
        </div>
        <GameSearchOptions
          class={classes["games-grid__search-options"]}
          routerProps={props}
        ></GameSearchOptions>
        <div className={classes["games-grid__games"]}>{selectedGames}</div>
      </div>
      <Route path="/games/:id" component={GameDetails} />
    </Aux>
  );
};

export default Games;

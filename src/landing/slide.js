import React, { Component } from "react";
import bask from "../image/bask.svg";
import soccer from "../image/soccer.svg";
import baseball from "../image/baseball.svg";
import meditation from "../image/meditation.svg";
import training from "../image/training.svg";
import healt from "../image/healt.svg";
import tracker from "../image/tracker.svg";
import run from "../image/run.svg";
import hike from "../image/hike.svg";
import boarding from "../image/boarding.svg";
import golf from "../image/golf.svg";
import yoga from "../image/yogo.svg";
class Slide extends Component {
  componentDidMount = () => {
    const root = document.documentElement;
    const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue(
      "--marquee-elements-displayed"
    );
    const marqueeContent = document.querySelector("ul.marquee-content");
    root.style.setProperty(
      "--marquee-elements",
      marqueeContent.children.length
    );
    for (let i = 0; i < marqueeElementsDisplayed; i++) {
      marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
    }
  };
  render() {
    return (
      <div className="inddjjf-masj">
        <div className="titlentjte">Find Your Favorite Activity</div>
        <div className="marquee">
          <ul className="marquee-content">
            <li>
              <img src={bask} />
            </li>

            <li>
              <img src={soccer} />
            </li>

            <li>
              <img src={baseball} />
            </li>

            <li>
              <img src={meditation} />
            </li>

            <li>
              <img src={training} />
            </li>

            <li>
              <img src={run} />
            </li>

            <li>
              <img src={tracker} />
            </li>

            <li>
              <img src={hike} />
            </li>

            <li>
              <img src={healt} />
            </li>

            <li>
              <img src={boarding} />
            </li>

            <li>
              <img src={golf} />
            </li>

            <li>
              <img src={yoga} />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Slide;

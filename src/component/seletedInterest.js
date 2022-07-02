import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import ApiUrl from "../url";
import { motion, AnimatePresence } from "framer-motion";
class SelctedInterest extends Component {
  state = {
    list: [
      "Ability",
      " Active",
      " Aerobics",
      " Athlete",
      " Athletics",
      " Attempt",
      " Attendance",
      " Averages",
      "Balance",
      "arms day",
      "full body",
      "leg day",
      " Body",
      " Bones",
      " Boxing",
      " Breath",
      " Breathe",
      "Cardiovascular",
      " Champion",
      " Championship",
      " Charisma",
      " Coach",
      " Collapse",
      " Competition",
      " Conditioning",
      " Conference",
      " Contract",
      " Coordination",
      " Courage",
      " Crunches",
      " Cycling",
      "Dancing",
      " Diet",
      "meal plan",
      " Distraction",
      " Dumbbells",
      "Endurance",
      " Energy",
      " Exalt",
      " Exemplary",
      " Exemption",
      " Exercise",
      "Endurance",
      " Energy",
      " Exalt",
      " Exemplary",
      " Exemption",
      " Exercise",
      "Fit",
      " Fitness",
      " Flex",
      " Force(s)",
      " Function",
      "Games",
      " Goal",
      " Goodwill",
      " Grip",
      " Gymnasium",
      "Health",
      " Healthy",
      " Herbs",
      " Hiking",
      " Hone",
      " Hoops",
      " Hygiene",
      " Hygienic",
      "Ice-skating",
      " Imagination",
      " Individual",
      " Injury",
      " Interpretations",
      "Jargon",
      " Jogging",
      " Joy",
      " Judge",
      " Judo",
      " Jump",
      "Kickoff",
      " Kinesiology",
      " Kinetic",
      "Leader",
      " League",
      " Legend",
      " Lumbar",
      "Magic",
      " Massage",
      " Masseur",
      " Mat",
      " Maximize",
      " Measure",
      " Medication",
      " Memory",
      " Metabolic",
      " Minimize",
      " Moisture",
      " Monitor",
      " Motivate",
      " Motivation",
      " Muscles",
      "Nemesis",
      " Nurse",
      " Nutrition",
      "Offensive",
      " Official",
      " Opportunity",
      " Opt",
      " Optimism",
      " Option",
      " Outstanding participation",
      "Percentage",
      " Performance",
      " Perspiration",
      " Pessimism",
      " Physiotherapy",
      " Pilates",
      " Player(s)",
      " Positioning",
      " Possession",
      " Potent",
      " Power",
      " Power-play",
      " Practice",
      " Prevention",
      " Professional",
      " Program",
      " Promising",
      " Protect",
      " Protection",
      " Pulley",
      " Punch bag",
      " Puncture",
      "Quads",
      " Quantity",
      " Quick",
      " Quiver",
      "Ranking",
      " Rebound",
      " Recognition",
      " Record",
      " Recovery",
      " Regulations",
      " Rehabilitation",
      " Relax",
      " Representative",
      " Reserve",
      " Resilient",
      " Resistance",
      " Risk",
      " Role",
      " Rowing",
      " Running",
      " Rush",
      "Sanitary",
      " Scenario",
      " Scheme",
      " Score(s)",
      " Scoreboard",
      " Scoring",
      " Season",
      " Sensible",
      " Shape up",
      " Sit-ups",
      " Size",
      " Skating",
      " Skiing",
      " Skill",
      " Slide",
      " Solo",
      " Speculation",
      " Spirit",
      " Sport(s)",
      " Sportsmanship",
      " Squad",
      " Squat",
      " Stability",
      " Stamina",
      " Standing(s)",
      " Statistics",
      " Stepper",
      " Strategy",
      " Streak",
      " Strength",
      " Stretching",
      " Stride",
      " Strong",
      "personal training",
      "community",
      "programs",
      " Supine",
      " Support",
      " Swimming",
      "Tackle",
      " Targets",
      " Team",
      " Teammate",
      " Tennis",
      " Testing",
      " Therapeutic",
      "Therapy",
      " Timeout",
      " Timing",
      " Tone",
      " Torso",
      " Tournament",
      " Trainer",
      " Training",
      " Transformation",
      " Treadmill",
      " Tremors",
      " Trot",
      "Unbelievable",
      " Unrestricted",
      " Unusual",
      "Vaccination",
      " Valiant",
      " Valor",
      " Vault",
      " Vibration",
      " Victory",
      " Vitamins",
      "Walking",
      " Warm up",
      " Watchful",
      " Weigh",
      " Weights",
      " Win",
      " Wince",
      " Winning",
      " Wisdom",
      " Work",
      " Workout",
      "X-rays",
      "Yards",
      " Yoga",
      "Yards",
      " Yoga",
      "myfitsta",
      "archer",
      "arena",
      "arrow",
      "athlete",
      "axel",
      "badminton",
      "ball",
      "base",
      "bat",
      "batter",
      "bicycle",
      "bike",
      "bocce",
      "bow",
      "box",
      "canoe",
      "catch",
      "cleats",
      "club",
      "coach",
      "compete",
      "crew",
      "cricket",
      "cycle",
      "cyclist",
      "dart",
      "defense",
      "diamond",
      "dive",
      "diver",
      "exercise",
      "fencing",
      "field",
      "fitness",
      "frisbee",
      "game",
      "gear",
      "goal",
      "goalie",
      "golf",
      "golfer",
      "guard",
      "gym",
      "gymnast",
      "helmet",
      "hockey",
      "home",
      "hoop",
      "hoops",
      "ice",
      "infield",
      "inning",
      "javelin",
      "jog",
      "judo",
      "jump",
      "jumper",
      "karate",
      "kayak",
      "kite",
      "lacrosse",
      "league",
      "lose",
      "loser",
      "luge",
      "major",
      "mallet",
      "mat",
      "medal",
      "mitt",
      "move",
      "net",
      "offense",
      "olympics",
      "out",
      "paddle",
      "pitch",
      "play",
      "player",
      "pole",
      "polo",
      "pool",
      "puck",
      "quarter",
      "quiver",
      "race",
      "racer",
      "referee",
      "relay",
      "ride",
      "rink",
      "row",
      "rower",
      "sail",
      "score",
      "scuba",
      "skate",
      "ski",
      "skier",
      "slalom",
      "sled",
      "sledder",
      "snowboard",
      "soccer",
      "sport",
      "squash",
      "stadium",
      "stick",
      "surfer",
      "swim",
      "swimmer",
      "tag",
      "target",
      "team",
      "tee",
      "tennis",
      "throw",
      "tie",
      "triathlon",
      "umpire",
      "vault",
      "volley",
      "walk",
      "weight",
      "win",
      "winner",
      "winning",
      "wrestler",
      "basketball",
      "run",
      "baseball",
    ],
    shown: [],
    selected: [],
    item: null,
  };

  handleNext = (data) => {
    if (this.state.selected.length <= 6) {
      let option = {
        accountId: this.props.users.userid,
        tags: this.state.selected,
      };
      axios.post(`${ApiUrl.Three}save-Interest`, option).then((result) => {
        this.props.UpdateInterest(result.data);
      });
    }
  };

  handleClik = (data) => {
    let listp = [...this.state.selected];
    if (listp.filter((e) => e === data).length > 0) {
      let list = this.state.selected.filter((item) => {
        return item !== data;
      });
      this.setState({
        selected: list,
      });
    } else {
      if (this.state.selected.length <= 5) {
        let list = [...this.state.selected, data];
        this.setState({
          selected: list,
        });
      }
    }
  };
  handlefilter = (e) => {
    let list = this.state.list.map((item) => {
      if (
        item.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
      ) {
        return item;
      } else {
        return "";
      }
    });

    this.setState({
      shown: [...new Set(list.filter(Boolean))],
    });
  };

  componentDidMount = () => {
    this.setState({
      shown: [...new Set(this.state.list)],
    });
  };

  render() {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: `${0.3}s ease` }}
          exit={{ opacity: 0, transform: "translateY(-100%)" }}
          className="wrpannr-rnr"
        >
          <div className="hold-the-subjection">
            <div className="hold-screajd">
              <div className="search-bar-chatrejk">
                <div className="degn-for-chat-ftjdjjr">
                  <i className="fas fa-search"></i>
                </div>
                <input
                  onChange={this.handlefilter}
                  className="find-conrrv"
                  type="text"
                  placeholder="Search Interest..."
                />
              </div>
            </div>
            <div className="holt-the-subsbrri">
              <div className="fjejfjjj">
                <div className="jferof">Select Your Interest:</div>
                <div className="nfjenrj">
                  {this.state.selected?.map((item, index) => {
                    return (
                      <button
                        onClick={() => {
                          this.handleClik(item);
                        }}
                        className={`wraprhjrj `}
                        key={index}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="fjejfjjjejt">
                {this.state.shown?.map((item, index) => {
                  return (
                    <button
                      onClick={() => {
                        this.handleClik(item);
                      }}
                      className={`wraprhjrj ${
                        this.state.selected.some((e) => e === item)
                          ? "active"
                          : ""
                      }`}
                      key={index}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="nexjur-fje">
              <button
                onClick={this.handleNext}
                className={`rj3jejtrjn ${
                  this.state.selected.length >= 6 ? "active" : ""
                }`}
              >
                NEXT
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    UpdateInterest: (data) => {
      dispatch({ type: "ADD_TO_INTEREST", data: data });
    },
  };
};

const mapstateToProps = (state) => {
  return {
    users: state.user,
    interest: state.interest,
  };
};
export default connect(mapstateToProps, mapDispatchToProps)(SelctedInterest);

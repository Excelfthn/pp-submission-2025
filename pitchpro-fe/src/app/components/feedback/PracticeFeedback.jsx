"use client";
import BasicLayout from "../BasicLayout"
import { Card } from "../Card";
import XpChip from "../XpChip";
import PaceChart from "../chart/PaceChart";
import Button from "../Button";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import IntonationChart from "../chart/IntonationChart";
import ArticulationChart from "../chart/ArticulationChart";
import { generateRandomTip } from "@/app/utils/getGenerateRandomTips";
import { motion } from "framer-motion";
import { setNavigationDirection } from "@/app/utils/NavigationDirection";
import { useDispatch, useSelector } from "react-redux";
import { fetchFeedback } from "@/redux/features/feedback/feedbackSlice";
import { badgeData } from "@/app/data/badgeData";
export default function PracticeFeedback({ onDone,id=1 }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, loading, error } = useSelector((state) => state.feedback);

  const handleQuit = () => {
        setNavigationDirection("backward");
      router.push("/story/1/1");  
  };

  useEffect(() => {
    if (id) {
      console.log("Fetching feedback with id:", id);
      dispatch(fetchFeedback(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (data) {
      console.log("Fetched feedback data:", data);
    }
  }, [data]);
  
  const metrics = data?.data?.dataFeedback?.metrics;
  const timeSeries = data?.data?.dataFeedback?.timeSeries;
  const improvement = data?.data?.dataFeedback?.improvement;
  const badgeId = data?.data?.badge;
  const badge = badgeData.find((b) => b.id === badgeId);


    return (
      <>
        <motion.div initial={{ x: "100%", opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: "100%", opacity: 0 }} transition={{ type: "tween", duration: 0.4 }}>
          <BasicLayout className="bg-neutral-5\0 h-full overflow-auto px-5 py-14">
            <div className="flex flex-col items-center gap-6 pb-2">
              <p className="text-center text-title font-[600] text-neutral-900">Practice Feedback</p>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Points">
                <XpChip></XpChip>
              </Card>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Badge">
                <div className="w-full flex flex-col items-center">
                  {badge && (
                    <>
                      <Image src={badge.src} alt={badge.label} width={90} height={90} />
                      <p className="text-caption-c1 text-semibold text-neutral-900 text-center">{badge.label}</p>
                    </>
                  )}
                  {!badge && <p className="text-caption-c1 text-semibold text-neutral-900 text-center">No badge available</p>}
                </div>
              </Card>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Pace">
                <PaceChart timeSeries={timeSeries ?? []} />
                <div className="flex flex-col items-start gap-4 mt-1">
                  <p className="text-label font-normal text-neutral-900">{improvement?.pace ?? "No feedback available."}</p>
                  <p className="text-label font-normal text-neutral-900">
                    {" "}
                    Tips ✌️
                    <span>
                      <ul>
                        <li>{generateRandomTip("pace")}</li>
                      </ul>
                    </span>
                  </p>
                </div>
              </Card>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Intonation">
                <IntonationChart timeSeries={timeSeries ?? []} />
                <div className="flex flex-col items-start gap-4 mt-1">
                  <p className="text-label font-normal text-neutral-900">{improvement?.intonation ?? "No feedback available."}</p>
                  <p className="text-label font-normal text-neutral-900">
                    {" "}
                    Tips ✌️
                    <span>
                      <ul>
                        <li>{generateRandomTip("intonation")}</li>
                      </ul>
                    </span>
                  </p>
                </div>
              </Card>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Articulation">
                <ArticulationChart timeSeries={timeSeries ?? []} />
                <div className="flex flex-col items-start gap-4 mt-1">
                  <p className="text-label font-normal text-neutral-900">{improvement?.articulation ?? "No feedback available."}</p>
                  <p className="text-label font-normal text-neutral-900">
                    {" "}
                    Tips ✌️
                    <span>
                      <ul>
                        <li>{generateRandomTip("articulation")}</li>
                      </ul>
                    </span>
                  </p>
                </div>
              </Card>
              <Card borderColor="#5CAAFF" shadow="#ADD5FF" title="Word Choice">
                <div className="flex flex-col items-start gap-4 mt-1">
                  <p className="text-label font-normal text-neutral-900">{improvement?.["word-choice"] ?? "No feedback available."}</p>
                  <p className="text-label font-normal text-neutral-900">
                    Tips ✌️
                    <span>
                      <ul>
                        <li>{generateRandomTip("word-choice")}</li>
                      </ul>
                    </span>
                  </p>
                </div>
              </Card>
              <div className="flex w-full flex-col gap-6 items-center">
                <Button variant="info">Check Voice Record</Button>
                <Button onClick={handleQuit} variant="info">
                  Back To Home
                </Button>
                <Button onClick={onDone}>Next Story</Button>
              </div>
            </div>
          </BasicLayout>
        </motion.div>
      </>
    );
}
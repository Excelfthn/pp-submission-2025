"use client";

import TopBar from "@/app/components/bar/TopBar";
import BasicLayout from "@/app/components/BasicLayout";
import ProgressBar from "@/app/components/ProgressBar";
import IconCancelGrey from "../../../../public/assets/icons/ic_cancel_grey";
import { Card } from "@/app/components/Card";
import CustomSlider from "@/app/components/CustomSlider";
import ContentWrapper from "@/app/components/ContentWrapper";
import OptionButton from "@/app/components/Buttons/OptionBtn";
import Button from "@/app/components/Button";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { sendPostTest } from "@/redux/features/Posttest/postTestSlice";
import { useRouter } from "next/navigation";
import useNetworkSync from "@/hooks/useNetworkSync";
export default function PostTest({ nodeId, onDone, status }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOnline, storeOffline } = useNetworkSync();
  const [anxietyLevel, setAnxietyLevel] = useState(null);
  const [anxietyReason, setAnxietyReason] = useState("");
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [offlineSubmitted, setOfflineSubmitted] = useState(false);


  const reasons = ["The topic", "The environment", "Lack of preparation", "Fear of failure"];

  useEffect(() => {
    if (anxietyLevel !== null && anxietyReason) {
      setProgress(100);
    } else if (anxietyLevel !== null || anxietyReason) {
      setProgress(50);
    } else {
      setProgress(0);
    }
  }, [anxietyLevel, anxietyReason]);

  const handleNext = () => {
    if (anxietyLevel === null || !anxietyReason) {
      alert("Please complete both questions before proceeding.");
      return;
    }
    setLoading(true);
    
    const testData = {
      id: nodeId,
      anxiety_level: anxietyLevel,
      anxiety_reason: anxietyReason,
      status,
    };

    if (isOnline) {
      // Submit online
      dispatch(sendPostTest(testData))
        .unwrap()
        .then(() => {
          onDone();
        })
        .catch((err) => {
          console.error("Posttest submission failed:", err);
          // Store offline as fallback
          const offlineItem = storeOffline('tests', {
            testType: 'posttest',
            ...testData
          });
          if (offlineItem) {
            setOfflineSubmitted(true);
            setTimeout(() => onDone(), 1000);
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      // Store offline
      const offlineItem = storeOffline('tests', {
        testType: 'posttest',
        ...testData
      });
      
      if (offlineItem) {
        setOfflineSubmitted(true);
        setTimeout(() => {
          onDone();
          setLoading(false);
        }, 1000);
      } else {
        alert('Failed to save test offline. Please try again.');
        setLoading(false);
      }
    }
  };

  const handleGoBack = () => {
    router.push("/story/1/1");
  };

  return (
    <BasicLayout className="bg-neutral-400">
      <TopBar bgColor="bg-neutral-50">
        <div className="flex w-full flex-row gap-6 items-center">
          <button onClick={handleGoBack}>
            <IconCancelGrey />
          </button>
          <ProgressBar progress={progress} />
        </div>
      </TopBar>

      <ContentWrapper className="pt-[102px] min-h-screen justify-between pb-12">
        <div className="w-full flex flex-col gap-6 mb-6">
          <Card borderColor="border-[#5CAAFF]" title="How anxious were you during this public speaking practice?">
            <div className="w-full pt-4">
              <CustomSlider onChange={setAnxietyLevel} />
            </div>
            <p className="text-caption-c1 w-full flex flex-row justify-between items-center pt-1 text-neutral-900 font-semibold">
              Not Anxious
              <span>Very Anxious</span>
            </p>
          </Card>

          <Card borderColor="border-[#5CAAFF]" title="What made you anxious during this public speaking practice?">
            <div className="flex mt-5 flex-col items-start gap-4">
              {reasons.map((label) => (
                <OptionButton key={label} label={label} selected={anxietyReason === label} onSelect={setAnxietyReason} />
              ))}
            </div>
          </Card>
        </div>

        <div className="w-full">
          {/* Network Status Indicator */}
          {!isOnline && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">
                  You're offline. Your test will be saved and synced when you're back online.
                </span>
              </div>
            </div>
          )}
          
          {/* Offline Success Message */}
          {offlineSubmitted && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm font-medium">
                  Test saved offline successfully!
                </span>
              </div>
            </div>
          )}
          
          <Button onClick={handleNext} disabled={anxietyLevel === null || !anxietyReason || loading}>
            {loading ? (isOnline ? "Submitting..." : "Saving offline...") : "Next"}
          </Button>
        </div>
      </ContentWrapper>
    </BasicLayout>
  );
}

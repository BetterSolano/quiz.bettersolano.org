"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { RotateCcw, ArrowRight, Home } from "lucide-react";
import { QuizResult } from "@/types/scoring";
import { CategoryId } from "@/types";
import { getStoredProgress } from "@/lib/storage";
import { getQuestionsByCategory } from "@/data/questions";
import { categories } from "@/data/categories";
import ResultsSummary from "@/components/results/ResultsSummary";
import ScoreBreakdown from "@/components/results/ScoreBreakdown";
import QuestionReview from "@/components/results/QuestionReview";
import ConfettiEffect from "@/components/ui/ConfettiEffect";
import Button from "@/components/ui/Button";
import { heroChild } from "@/styles/animations";
import { Suspense } from "react";

function ResultsContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    const categoryId = params.categoryId as string;
    const sessionId = searchParams.get("session");

    const [result, setResult] = useState<QuizResult | null>(null);

    const category = useMemo(
        () => categories.find((c) => c.id === categoryId),
        [categoryId]
    );

    const questions = useMemo(
        () => getQuestionsByCategory(categoryId as CategoryId),
        [categoryId]
    );

    useEffect(() => {
        const progress = getStoredProgress();
        const found = progress.quizHistory.find((r) => r.sessionId === sessionId);
        if (found) {
            setResult(found);
        }
    }, [sessionId]);

    if (!result || !category) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Results Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    Could not find results for this quiz session.
                </p>
                <Link href="/quiz">
                    <Button>Back to Quizzes</Button>
                </Link>
            </div>
        );
    }

    const showConfetti = result.grade === "S" || result.grade === "A";

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-8">
            <ConfettiEffect active={showConfetti} />

            <ResultsSummary result={result} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ScoreBreakdown result={result} />

                <motion.div
                    variants={heroChild}
                    initial="hidden"
                    animate="visible"
                    className="space-y-6 w-full"
                >
                    <Link href={`/quiz/${categoryId}`}>
                        <Button variant="primary" className="w-full">
                            <RotateCcw className="w-4 h-4" />
                            Retry {category.name}
                        </Button>
                    </Link>
                    <Link href="/quiz">
                        <Button variant="secondary" className="w-full">
                            <ArrowRight className="w-4 h-4" />
                            Try Another Category
                        </Button>
                    </Link>
                    <Link href="/">
                        <Button variant="ghost" className="w-full">
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>

            <QuestionReview result={result} questions={questions} />
        </div>
    );
}

export default function ResultsClient() {
    return (
        <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading results...</div>}>
            <ResultsContent />
        </Suspense>
    );
}

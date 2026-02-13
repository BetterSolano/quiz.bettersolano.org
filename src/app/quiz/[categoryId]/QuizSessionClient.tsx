"use client";

import { useParams, useRouter } from "next/navigation";
import { useMemo, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import QuizEngine from "@/components/quiz/QuizEngine";
import { CategoryId } from "@/types";
import { getQuestionsByCategory } from "@/data/questions";
import { categories } from "@/data/categories";

const validCategories = ["history", "culture", "geography", "general"];

export default function QuizSessionClient() {
    const params = useParams();
    const router = useRouter();
    const categoryId = params.categoryId as string;

    const category = useMemo(
        () => categories.find((c) => c.id === categoryId),
        [categoryId]
    );

    const questions = useMemo(
        () => (validCategories.includes(categoryId) ? getQuestionsByCategory(categoryId as CategoryId) : []),
        [categoryId]
    );

    const handleComplete = useCallback(
        (sessionId: string) => {
            // Small delay for the final animation
            setTimeout(() => {
                router.push(`/quiz/${categoryId}/results?session=${sessionId}`);
            }, 500);
        },
        [categoryId, router]
    );

    if (!category || questions.length === 0) {
        return (
            <div className="max-w-2xl mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Category Not Found</h1>
                <p className="text-muted-foreground mb-6">
                    The quiz category you&apos;re looking for doesn&apos;t exist.
                </p>
                <Link
                    href="/quiz"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to categories
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
            {/* Back link */}
            <Link
                href="/quiz"
                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>{category.name}</span>
            </Link>

            <QuizEngine
                categoryId={categoryId as CategoryId}
                questions={questions}
                onComplete={handleComplete}
            />
        </div>
    );
}

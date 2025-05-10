import { Award, BarChart3, BookOpen, Code } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { useAppStore } from "../lib/store";

const HomePage: React.FC = () => {
  const { isAuthenticated } = useAppStore();

  return (
    <div className="animate-fade-in">
      {/* Hero section */}
      <section className="bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              プログラミングを
              <span className="text-primary-600 dark:text-primary-400">ステップバイステップ</span>
              でマスター
            </h1>
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-600 dark:text-gray-300 sm:text-xl md:mt-5 md:max-w-3xl">
              あなたのレベルに合わせた対話型チャレンジで、プログラミングの概念を学びましょう
            </p>
            <div className="mt-10 flex justify-center">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary text-base px-8 py-3">
                  ダッシュボードへ
                </Link>
              ) : (
                <div className="space-x-4">
                  <Link to="/register" className="btn btn-primary text-base px-8 py-3">
                    学習を始める
                  </Link>
                  <Link to="/login" className="btn btn-outline text-base px-8 py-3">
                    ログイン
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              CodeQuestの使い方
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                段階的に学習
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                基礎から始めて、10段階のスキルレベルで徐々にレベルアップ。
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-secondary-100 dark:bg-secondary-900 text-secondary-600 dark:text-secondary-400">
                <Code className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
                チャレンジに挑戦
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                AIが生成するコーディング問題で知識を実践的にテスト。
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-accent-100 dark:bg-accent-900 text-accent-600 dark:text-accent-400">
                <BarChart3 className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">進捗を追跡</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                詳細なパフォーマンス分析で学習の進捗を可視化。
              </p>
            </div>

            <div className="card p-6 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-md flex items-center justify-center bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">実績を獲得</h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                スキルを向上させながら新しいレベルと実績を解除。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Levels section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">学習の流れ</h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-600 dark:text-gray-300 mx-auto">
              初心者から上級者まで体系的に学べるカリキュラム
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-primary-600 dark:bg-primary-500 text-white">
                  1
                </div>
                <h3 className="ml-4 text-lg font-medium">初級</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 変数とデータ型</li>
                <li>• 基本演算子</li>
                <li>• 条件分岐</li>
                <li>• ループ</li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-secondary-600 dark:bg-secondary-500 text-white">
                  2
                </div>
                <h3 className="ml-4 text-lg font-medium">中級</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 関数</li>
                <li>• 配列とオブジェクト</li>
                <li>• エラーハンドリング</li>
                <li>• 基本アルゴリズム</li>
              </ul>
            </div>

            <div className="card p-6">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-accent-600 dark:bg-accent-500 text-white">
                  3
                </div>
                <h3 className="ml-4 text-lg font-medium">上級</h3>
              </div>
              <ul className="mt-2 text-gray-600 dark:text-gray-300 space-y-2">
                <li>• 応用アルゴリズム</li>
                <li>• データ構造</li>
                <li>• 計算量（時間・空間）</li>
                <li>• デザインパターン</li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            {isAuthenticated ? (
              <Link to="/levels" className="btn btn-primary text-base px-8 py-3">
                すべてのレベルを見る
              </Link>
            ) : (
              <Link to="/register" className="btn btn-primary text-base px-8 py-3">
                学習を始める
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-20 bg-primary-600 dark:bg-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white">さあ、学習を始めましょう！</h2>
            <p className="mt-4 max-w-2xl text-xl text-primary-100 mx-auto">
              何千人もの学習者と一緒に、対話型チャレンジでプログラミングをマスターしよう
            </p>
            <div className="mt-10">
              {isAuthenticated ? (
                <Link
                  to="/dashboard"
                  className="btn bg-white text-primary-700 hover:bg-gray-100 text-base px-8 py-3"
                >
                  ダッシュボードへ
                </Link>
              ) : (
                <Link
                  to="/register"
                  className="btn bg-white text-primary-700 hover:bg-gray-100 text-base px-8 py-3"
                >
                  無料でアカウント作成
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

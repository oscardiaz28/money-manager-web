import React from 'react'
import { useAppContext } from '../hooks/useAppContext'
import { useProfileStore } from '../store/useProfileStore'
import { Dashboard } from '../components/Dashboard';
import { useQuery } from '@tanstack/react-query';
import { dashboardData } from '../services/dashboard.service';
import { InfoCard } from '../components/InfoCard';
import { Wallet } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InfoCardSkeleton } from '../components/InfoCardSkeleton';

import { motion } from "framer-motion";
import { RecentTransactions } from '../components/RecentTransactions';
import { FinancialOverview } from '../components/FinancialOverview';
import { Transactions } from '../components/Transactions';


export const Home = () => {

  const { user } = useProfileStore();
  const navigate = useNavigate();

  const { data: dashboard, isLoading, isFetching } = useQuery({
    queryKey: ["dashboard"],
    queryFn: dashboardData,
  })

  return (
    <Dashboard>
      <div className='my-5 mx-auto'>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          { isLoading ? (
            <InfoCardSkeleton />
          ) : (
            <>
              {[
                { label: "Balance Total", value: dashboard?.totalBalance || 0, color: "bg-purple-800" },
                { label: "Total Ingresos", value: dashboard?.totalIncomes || 0, color: "bg-green-800" },
                { label: "Total Gastos", value: dashboard?.totalExpenses || 0, color: "bg-red-800" },
              ].map( (card, idx) => (
                <motion.div
                  key={card.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <InfoCard {...card} icon={<Wallet />} />
                </motion.div>
              ))}
            </>
          )}

        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-6'>
          {/* recent transactions */}
          <RecentTransactions 
            label={"Operaciones Recientes"}
            path={"/expense"}
            transactions={dashboard?.recentTransactions || []}  
            isLoading={isLoading}
          />

          {/* financial overview */}
          <FinancialOverview 
            totalBalance={dashboard?.totalBalance || 0}
            totalIncome={dashboard?.totalIncomes || 0}
            totalExpense={dashboard?.totalExpenses || 0}
          />

          {/* recent expenses */}
          <Transactions label={"Ultimos Gastos"} path={"/expense"} type={"expenses"} transactions={dashboard?.recent5Expenses || []} />

          {/* recent incomes */}
          <Transactions label={"Ultimos Ingresos"} path={"/income"} type={"incomes"} transactions={dashboard?.recent5Incomes || []} />

        </div>

      </div>

    </Dashboard>
  )
}

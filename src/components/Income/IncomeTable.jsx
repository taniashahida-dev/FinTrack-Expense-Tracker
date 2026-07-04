"use client";

import { useState } from "react";
import { Table } from "@heroui/react";
import { TrendingUp, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import EditIncomeModal from "./EditIncomeModal";
import DeleteIncomeModal from "./DeleteIncomeModal";

export default function IncomeTable({ incomes = [], userEmail }) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [selectedIncome, setSelectedIncome] = useState(null);

  const getSourceStyles = (source) => {
    switch (source?.toLowerCase()) {
      case "salary":
        return { bg: "bg-[#10B981]/10", text: "text-[#10B981]" };
      case "freelancing":
        return { bg: "bg-[#8B5CF6]/10", text: "text-[#8B5CF6]" };
      case "investment":
        return { bg: "bg-[#06B6D4]/10", text: "text-[#06B6D4]" };
      default:
        return { bg: "bg-gray-500/10", text: "text-gray-400" };
    }
  };

  return (
    <div className="w-full">
      <Table className="p-0 bg-transparent shadow-none border-none">
        <Table.ScrollContainer>
          <Table.Content aria-label="Income transactions table">
            <Table.Header>
              <Table.Column
                isRowHeader
                className="bg-transparent text-gray-500 dark:text-gray-400 text-sm font-normal py-4 pb-3 pl-6 border-b border-gray-800/40"
              >
                Source
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 dark:text-gray-400 text-sm font-normal py-4 pb-3 border-b border-gray-800/40">
                Description
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 dark:text-gray-400 text-sm font-normal py-4 pb-3 border-b border-gray-800/40">
                Date
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 dark:text-gray-400 text-sm font-normal py-4 pb-3 text-right border-b border-gray-800/40">
                Amount
              </Table.Column>
              <Table.Column className="bg-transparent text-gray-500 dark:text-gray-400 text-sm font-normal py-4 pb-3 text-right pr-6 border-b border-gray-800/40">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body>
              {incomes.map((income) => {
                const styles = getSourceStyles(income.source);
                return (
                  <Table.Row
                    key={income._id || income.id}
                    className="border-b border-gray-800/20 hover:bg-gray-50/20 dark:hover:bg-[#0d111d]/30 transition-colors"
                  >
                    <Table.Cell className="py-4 pl-6 font-semibold text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-8 h-8 flex items-center justify-center rounded-full ${styles.bg} ${styles.text}`}
                        >
                          <TrendingUp className="w-4 h-4" />
                        </span>
                        {income.source}
                      </div>
                    </Table.Cell>
                    <Table.Cell className="py-4 text-gray-500 dark:text-gray-400 text-sm font-normal max-w-xs truncate">
                      {income.description || "—"}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-gray-500 dark:text-gray-400 text-sm font-normal">
                      {income.date}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-right font-bold text-txt-success text-base">
                      +৳{income.amount?.toLocaleString()}
                    </Table.Cell>
                    <Table.Cell className="py-4 text-right pr-6">
                      <div className="inline-flex items-center gap-4 text-gray-400 dark:text-gray-500">
                        <button
                          onClick={() => {
                            setSelectedIncome(income);
                            setIsEditOpen(true);
                          }}
                          className="hover:text-yellow-500 transition opacity-80 hover:opacity-100 p-1"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedIncome(income);
                            setIsDeleteOpen(true);
                          }}
                          className="hover:text-red-500 transition opacity-80 hover:opacity-100 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
      </Table>

      {incomes.length === 0 && (
        <div className="py-12 text-center text-gray-500 font-medium border-b border-gray-800/20">
          No income records found for this user.
        </div>
      )}
      <EditIncomeModal
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        income={selectedIncome}
        userEmail={userEmail}
        onUpdateSuccess={() => {
          router.refresh();
          setTimeout(() => window.location.reload(), 100);
        }}
      />

      <DeleteIncomeModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        income={selectedIncome}
        userEmail={userEmail}
        onDeleteSuccess={() => router.refresh()}
      />
    </div>
  );
}

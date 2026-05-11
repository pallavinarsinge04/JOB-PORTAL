// Update Job
router.put(
  "/update/:id",
  async (req, res) => {

    try {

      await Job.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      res.json({
        message:
        "Job Updated Successfully",
      });

    } catch (err) {
      res.status(500).json(err);
    }
  }
);